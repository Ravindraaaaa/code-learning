import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../src/app.js';
import { activateDevFallbackStore } from '../src/config/devFallbackStore.js';
import {
  User,
  Language,
  Track,
  Topic,
  Batch,
  Purchase,
  Lesson,
  AssessmentQuestion,
  DebugChallenge,
  WeeklyTest,
  Competition,
  Notification
} from '../src/models/index.js';
import { signToken } from '../src/utils/jwt.js';
import { createNotification } from '../src/services/notificationService.js';

let server;
let baseUrl;

const signTestToken = (payload) => {
  return signToken(payload);
};

const makeRequest = (path, method = 'GET', body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const headers = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(
      url,
      {
        method,
        headers,
      },
      (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve({ statusCode: res.statusCode, headers: res.headers, body: parsed });
          } catch (e) {
            resolve({ statusCode: res.statusCode, headers: res.headers, rawBody: data });
          }
        });
      }
    );

    req.on('error', (err) => reject(err));

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

describe('Notifications System Test Suite', () => {
  let studentUser;
  let studentToken;
  let adminUser;
  let adminToken;

  before(async () => {
    await activateDevFallbackStore(
      User,
      Language,
      Track,
      Batch,
      Purchase,
      Topic,
      Lesson,
      AssessmentQuestion,
      DebugChallenge,
      WeeklyTest,
      Competition,
      Notification
    );

    studentUser = await User.findOne({ email: 'student@codeforge.dev' });
    if (!studentUser) {
      studentUser = await User.create({
        name: 'Test Student',
        email: 'student@codeforge.dev',
        passwordHash: 'hashed_password_123',
        role: 'student'
      });
    }
    studentToken = signTestToken({ id: studentUser._id.toString(), email: studentUser.email, role: 'student' });

    adminUser = await User.findOne({ email: 'admin@codeforge.dev' });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Test Admin',
        email: 'admin@codeforge.dev',
        passwordHash: 'hashed_admin_123',
        role: 'admin'
      });
    }
    adminToken = signTestToken({ id: adminUser._id.toString(), email: adminUser.email, role: 'admin' });

    server = app.listen(0);
    const port = server.address().port;
    baseUrl = `http://localhost:${port}`;
  });

  after((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  test('1. Support Notification Types Verification: Model accepts all 6 required notification types', async () => {
    const types = [
      'assessment_result',
      'test_result',
      'competition',
      'purchase_confirmation',
      'admin_announcement',
      'learning_recommendation'
    ];

    for (const type of types) {
      const notif = await createNotification({
        userId: studentUser._id,
        type,
        title: `Test ${type}`,
        message: `Message for ${type}`
      });
      assert.equal(notif.type, type);
      assert.equal(notif.isRead, false);
      assert.ok(notif._id);
    }
  });

  test('2. Student Get Notifications List & Unread Count', async () => {
    const res = await makeRequest('/api/v1/notifications', 'GET', null, studentToken);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data.notifications));
    assert.ok(res.body.data.notifications.length >= 6);
    assert.ok(res.body.data.unreadCount >= 6);
  });

  test('3. Student Get Unread Count Endpoint', async () => {
    const res = await makeRequest('/api/v1/notifications/unread-count', 'GET', null, studentToken);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.unreadCount >= 6);
  });

  test('4. Mark Single Notification as Read', async () => {
    const listRes = await makeRequest('/api/v1/notifications', 'GET', null, studentToken);
    const firstNotif = listRes.body.data.notifications[0];

    const markRes = await makeRequest(`/api/v1/notifications/${firstNotif._id}/read`, 'PATCH', null, studentToken);
    assert.equal(markRes.statusCode, 200);
    assert.equal(markRes.body.success, true);
    assert.equal(markRes.body.data.isRead, true);
    assert.ok(markRes.body.data.readAt);
  });

  test('5. Mark All Notifications as Read', async () => {
    const markAllRes = await makeRequest('/api/v1/notifications/read-all', 'PATCH', null, studentToken);
    assert.equal(markAllRes.statusCode, 200);
    assert.equal(markAllRes.body.success, true);

    const countRes = await makeRequest('/api/v1/notifications/unread-count', 'GET', null, studentToken);
    assert.equal(countRes.body.data.unreadCount, 0);
  });

  test('6. Admin Broadcast Announcement Creation', async () => {
    const payload = {
      title: 'Platform Upgrade Scheduled',
      message: 'CodeForge will undergo maintenance tonight at 2:00 AM UTC.'
    };

    const res = await makeRequest('/api/v1/admin/notifications/announcement', 'POST', payload, adminToken);
    assert.equal(res.statusCode, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.recipientCount >= 1);

    const notifRes = await makeRequest('/api/v1/notifications', 'GET', null, studentToken);
    const announcements = notifRes.body.data.notifications.filter(n => n.type === 'admin_announcement');
    assert.ok(announcements.some(a => a.title === payload.title));
  });

  test('7. Admin Targeted Announcement to Specific Student', async () => {
    const payload = {
      title: 'Welcome to CodeForge Admin Beta',
      message: 'You have been selected for beta testing.',
      targetUser: studentUser._id.toString()
    };

    const res = await makeRequest('/api/v1/admin/notifications/announcement', 'POST', payload, adminToken);
    assert.equal(res.statusCode, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.recipientCount, 1);
  });

  test('8. Delete Notification for Student', async () => {
    const listRes = await makeRequest('/api/v1/notifications', 'GET', null, studentToken);
    const notifToDelete = listRes.body.data.notifications[0];

    const delRes = await makeRequest(`/api/v1/notifications/${notifToDelete._id}`, 'DELETE', null, studentToken);
    assert.equal(delRes.statusCode, 200);
    assert.equal(delRes.body.success, true);

    const getRes = await makeRequest('/api/v1/notifications', 'GET', null, studentToken);
    const exists = getRes.body.data.notifications.some(n => n._id === notifToDelete._id);
    assert.equal(exists, false);
  });

  test('9. Unauthenticated Access Rejection', async () => {
    const res = await makeRequest('/api/v1/notifications', 'GET', null, null);
    assert.equal(res.statusCode, 401);
  });

  test('10. Non-Admin Announcement Creation Rejection', async () => {
    const payload = {
      title: 'Unauthorized Broadcast',
      message: 'This should fail.'
    };
    const res = await makeRequest('/api/v1/admin/notifications/announcement', 'POST', payload, studentToken);
    assert.equal(res.statusCode, 403);
  });
});
