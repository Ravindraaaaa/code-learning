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
} from '../src/models/index.js';
import { signToken } from '../src/utils/jwt.js';

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
        let rawData = '';
        res.on('data', (chunk) => (rawData += chunk));
        res.on('end', () => {
          let json = {};
          try {
            if (rawData) json = JSON.parse(rawData);
          } catch (e) {
            json = { raw: rawData };
          }
          resolve({ status: res.statusCode, body: json });
        });
      }
    );

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

describe('Admin CRUD API Test Suite (Students, Languages, Tracks, Topics)', () => {
  let adminToken;
  let studentToken;
  let adminUser;
  let studentUser;
  let createdStudentId;
  let createdLanguageId;
  let createdTrackId;
  let createdTopicId;

  before(async () => {
    // Activate fallback store for isolated in-memory testing
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
      Competition
    );

    // Setup HTTP test server on random port
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });

    // Create test accounts
    adminUser = await User.create({
      name: 'Super Admin',
      email: 'superadmin@codeforge.dev',
      passwordHash: 'hash',
      role: 'admin',
    });

    studentUser = await User.create({
      name: 'Regular Student',
      email: 'regularstudent@codeforge.dev',
      passwordHash: 'hash',
      role: 'student',
    });

    adminToken = signTestToken({ id: adminUser._id, email: adminUser.email, role: 'admin' });
    studentToken = signTestToken({ id: studentUser._id, email: studentUser.email, role: 'student' });
  });

  after((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  /* ==========================================================================
     1. SECURITY & AUTHORIZATION ENFORCEMENT
     ========================================================================== */

  test('1. Authorization Guard: Unauthenticated requests to Admin APIs are rejected with 401', async () => {
    const res = await makeRequest('/api/v1/admin/students', 'GET');
    assert.equal(res.status, 401);
    assert.equal(res.body.success, false);
  });

  test('2. Authorization Guard: Student requests to Admin APIs are rejected with 403 Forbidden', async () => {
    const res = await makeRequest('/api/v1/admin/students', 'GET', null, studentToken);
    assert.equal(res.status, 403);
    assert.equal(res.body.success, false);
  });

  /* ==========================================================================
     2. STUDENTS ADMIN CRUD
     ========================================================================== */

  test('3. Students Validation: Rejects student creation with missing/invalid inputs', async () => {
    const res = await makeRequest(
      '/api/v1/admin/students',
      'POST',
      { name: 'A', email: 'invalid-email', password: 'short' },
      adminToken
    );
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  test('4. Students Create: Admin creates a new student account', async () => {
    const res = await makeRequest(
      '/api/v1/admin/students',
      'POST',
      {
        name: 'New Admin Created Student',
        email: 'admincreated@codeforge.dev',
        password: 'Password123!',
        role: 'student',
      },
      adminToken
    );

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.email, 'admincreated@codeforge.dev');
    assert.equal(res.body.data.passwordHash, undefined);
    createdStudentId = res.body.data._id;
  });

  test('5. Students Read (List, Search, Filter, Pagination): Retrieves student list with query params', async () => {
    const res = await makeRequest(
      '/api/v1/admin/students?search=admincreated&page=1&limit=5',
      'GET',
      null,
      adminToken
    );

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data.students));
    assert.ok(res.body.data.students.length >= 1);
    assert.equal(res.body.data.pagination.page, 1);
    assert.equal(res.body.data.pagination.limit, 5);
  });

  test('6. Students Read Detail: Retrieves specific student details by ID', async () => {
    const res = await makeRequest(`/api/v1/admin/students/${createdStudentId}`, 'GET', null, adminToken);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data._id, createdStudentId);
  });

  test('7. Students Update: Admin updates student name and role', async () => {
    const res = await makeRequest(
      `/api/v1/admin/students/${createdStudentId}`,
      'PUT',
      { name: 'Updated Student Name' },
      adminToken
    );

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.name, 'Updated Student Name');
  });

  test('8. Students Delete: Admin deletes student account', async () => {
    const res = await makeRequest(`/api/v1/admin/students/${createdStudentId}`, 'DELETE', null, adminToken);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);

    // Confirm student is deleted
    const checkRes = await makeRequest(`/api/v1/admin/students/${createdStudentId}`, 'GET', null, adminToken);
    assert.equal(checkRes.status, 404);
  });

  /* ==========================================================================
     3. LANGUAGES ADMIN CRUD
     ========================================================================== */

  test('9. Languages Create & Validation: Validates and creates a new runtime language', async () => {
    // 1. Validation failure
    const invalidRes = await makeRequest(
      '/api/v1/admin/languages',
      'POST',
      { name: '' },
      adminToken
    );
    assert.equal(invalidRes.status, 400);

    // 2. Successful creation
    const res = await makeRequest(
      '/api/v1/admin/languages',
      'POST',
      {
        name: 'Rust Runtime',
        slug: 'rust',
        version: '1.75.0',
        fileExtension: '.rs',
        monacoMode: 'rust',
        description: 'Systems programming language',
        displayOrder: 6,
      },
      adminToken
    );

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.slug, 'rust');
    createdLanguageId = res.body.data._id;
  });

  test('10. Languages Read (List & Detail): Retrieves languages list and detail', async () => {
    const listRes = await makeRequest('/api/v1/admin/languages?search=rust', 'GET', null, adminToken);
    assert.equal(listRes.status, 200);
    assert.equal(listRes.body.data.languages.length, 1);

    const detailRes = await makeRequest(`/api/v1/admin/languages/${createdLanguageId}`, 'GET', null, adminToken);
    assert.equal(detailRes.status, 200);
    assert.equal(detailRes.body.data.name, 'Rust Runtime');
  });

  test('11. Languages Update & Delete: Updates and deletes language', async () => {
    const updateRes = await makeRequest(
      `/api/v1/admin/languages/${createdLanguageId}`,
      'PUT',
      { version: '1.76.0' },
      adminToken
    );
    assert.equal(updateRes.status, 200);
    assert.equal(updateRes.body.data.version, '1.76.0');

    const deleteRes = await makeRequest(`/api/v1/admin/languages/${createdLanguageId}`, 'DELETE', null, adminToken);
    assert.equal(deleteRes.status, 200);
  });

  /* ==========================================================================
     4. TRACKS ADMIN CRUD
     ========================================================================== */

  test('12. Tracks Create & Read: Creates and lists learning tracks', async () => {
    const res = await makeRequest(
      '/api/v1/admin/tracks',
      'POST',
      {
        name: 'DevOps & Cloud Engineering',
        slug: 'devops-cloud',
        description: 'Master Docker, Kubernetes, and AWS infrastructure.',
        category: 'Cloud Engineering',
        modules: [
          { name: 'Docker Containers', slug: 'docker', order: 1, description: 'Containerization basics' },
        ],
      },
      adminToken
    );

    assert.equal(res.status, 201);
    assert.equal(res.body.data.slug, 'devops-cloud');
    createdTrackId = res.body.data._id;

    const listRes = await makeRequest('/api/v1/admin/tracks?search=devops', 'GET', null, adminToken);
    assert.equal(listRes.status, 200);
    assert.equal(listRes.body.data.tracks.length, 1);
  });

  test('13. Tracks Update & Delete: Updates and deletes learning track', async () => {
    const updateRes = await makeRequest(
      `/api/v1/admin/tracks/${createdTrackId}`,
      'PUT',
      { category: 'Infrastructure Architecture' },
      adminToken
    );
    assert.equal(updateRes.status, 200);
    assert.equal(updateRes.body.data.category, 'Infrastructure Architecture');

    const deleteRes = await makeRequest(`/api/v1/admin/tracks/${createdTrackId}`, 'DELETE', null, adminToken);
    assert.equal(deleteRes.status, 200);
  });

  /* ==========================================================================
     5. TOPICS ADMIN CRUD
     ========================================================================== */

  test('14. Topics Create & Read: Creates and lists topics with search & pagination', async () => {
    const res = await makeRequest(
      '/api/v1/admin/topics',
      'POST',
      {
        title: 'Asynchronous JavaScript & Event Loop',
        description: 'Deep dive into Promises, Async/Await, and Microtask queue.',
        difficulty: 'Intermediate',
        order: 5,
        status: 'published',
      },
      adminToken
    );

    assert.equal(res.status, 201);
    assert.equal(res.body.data.title, 'Asynchronous JavaScript & Event Loop');
    createdTopicId = res.body.data._id;

    const listRes = await makeRequest('/api/v1/admin/topics?search=asynchronous', 'GET', null, adminToken);
    assert.equal(listRes.status, 200);
    assert.equal(listRes.body.data.topics.length, 1);
  });

  test('15. Topics Update & Delete: Updates topic difficulty and deletes topic', async () => {
    const updateRes = await makeRequest(
      `/api/v1/admin/topics/${createdTopicId}`,
      'PUT',
      { difficulty: 'Advanced' },
      adminToken
    );
    assert.equal(updateRes.status, 200);
    assert.equal(updateRes.body.data.difficulty, 'Advanced');

    const deleteRes = await makeRequest(`/api/v1/admin/topics/${createdTopicId}`, 'DELETE', null, adminToken);
    assert.equal(deleteRes.status, 200);
  });

  /* ==========================================================================
     6. LESSONS ADMIN CRUD & PUBLISH/UNPUBLISH
     ========================================================================== */

  let createdLessonId;

  test('16. Lessons Create & Validation: Validates and creates a lesson', async () => {
    // 1. Validation error
    const invalidRes = await makeRequest('/api/v1/admin/lessons', 'POST', { title: '' }, adminToken);
    assert.equal(invalidRes.status, 400);

    // 2. Successful creation
    const res = await makeRequest(
      '/api/v1/admin/lessons',
      'POST',
      {
        title: 'Mastering JavaScript Async/Await',
        content: 'Comprehensive lesson on promise chains and async/await syntax.',
        topic: createdTopicId || '60c72b2f9b1d8b2b8c8b4567',
        difficulty: 'Intermediate',
        order: 1,
        status: 'draft',
      },
      adminToken
    );

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.title, 'Mastering JavaScript Async/Await');
    assert.equal(res.body.data.status, 'draft');
    createdLessonId = res.body.data._id;
  });

  test('17. Lessons Publish & Unpublish: Toggles lesson status between published and draft', async () => {
    // Publish
    const pubRes = await makeRequest(`/api/v1/admin/lessons/${createdLessonId}/publish`, 'PATCH', null, adminToken);
    assert.equal(pubRes.status, 200);
    assert.equal(pubRes.body.data.status, 'published');

    // Unpublish
    const unpubRes = await makeRequest(`/api/v1/admin/lessons/${createdLessonId}/unpublish`, 'PATCH', null, adminToken);
    assert.equal(unpubRes.status, 200);
    assert.equal(unpubRes.body.data.status, 'draft');

    // Delete
    const deleteRes = await makeRequest(`/api/v1/admin/lessons/${createdLessonId}`, 'DELETE', null, adminToken);
    assert.equal(deleteRes.status, 200);
  });

  /* ==========================================================================
     7. QUESTIONS ADMIN CRUD & PUBLISH/UNPUBLISH
     ========================================================================== */

  let createdQuestionId;

  test('18. Questions Create & Validation: Validates and creates an assessment question', async () => {
    // 1. Validation failure
    const invalidRes = await makeRequest('/api/v1/admin/questions', 'POST', { questionText: 'Q?' }, adminToken);
    assert.equal(invalidRes.status, 400);

    // 2. Successful creation
    const res = await makeRequest(
      '/api/v1/admin/questions',
      'POST',
      {
        questionText: 'What is the runtime complexity of binary search?',
        options: ['O(N)', 'O(log N)', 'O(N^2)', 'O(1)'],
        correctOptionIndex: 1,
        difficulty: 'Intermediate',
        status: 'draft',
      },
      adminToken
    );

    assert.equal(res.status, 201);
    createdQuestionId = res.body.data._id;
    assert.equal(res.body.data.questionText, 'What is the runtime complexity of binary search?');
    assert.equal(res.body.data.status, 'draft');
  });

  test('19. Questions Publish & Unpublish: Toggles question status', async () => {
    const pubRes = await makeRequest(`/api/v1/admin/questions/${createdQuestionId}/publish`, 'PATCH', null, adminToken);
    assert.equal(pubRes.status, 200);
    assert.equal(pubRes.body.data.status, 'published');

    const unpubRes = await makeRequest(`/api/v1/admin/questions/${createdQuestionId}/unpublish`, 'PATCH', null, adminToken);
    assert.equal(unpubRes.status, 200);
    assert.equal(unpubRes.body.data.status, 'draft');

    const deleteRes = await makeRequest(`/api/v1/admin/questions/${createdQuestionId}`, 'DELETE', null, adminToken);
    assert.equal(deleteRes.status, 200);
  });

  /* ==========================================================================
     8. DEBUG ARENA CHALLENGES ADMIN CRUD & PUBLISH/UNPUBLISH
     ========================================================================== */

  let createdChallengeId;

  test('20. Debug Challenges Create & Validation: Creates a debug challenge', async () => {
    const invalidRes = await makeRequest('/api/v1/admin/debug-challenges', 'POST', { title: 'Test' }, adminToken);
    assert.equal(invalidRes.status, 400);

    const res = await makeRequest(
      '/api/v1/admin/debug-challenges',
      'POST',
      {
        title: 'Fix Array Off-By-One Error',
        description: 'Locate and fix the loop index bug.',
        bugType: 'Logical',
        difficulty: 'Beginner',
        language: 'javascript',
        buggyCode: 'for (let i=0; i<=arr.length; i++) {}',
        solutionCode: 'for (let i=0; i<arr.length; i++) {}',
        testCases: [{ input: '[1,2,3]', expectedOutput: '3', isHidden: false }],
        status: 'draft',
      },
      adminToken
    );

    assert.equal(res.status, 201);
    assert.equal(res.body.data.title, 'Fix Array Off-By-One Error');
    assert.equal(res.body.data.bugType, 'Logical');
    createdChallengeId = res.body.data._id;
  });

  test('21. Debug Challenges Publish & Unpublish: Toggles active/published status', async () => {
    const pubRes = await makeRequest(`/api/v1/admin/debug-challenges/${createdChallengeId}/publish`, 'PATCH', null, adminToken);
    assert.equal(pubRes.status, 200);
    assert.equal(pubRes.body.data.status, 'published');
    assert.equal(pubRes.body.data.isActive, true);

    const unpubRes = await makeRequest(`/api/v1/admin/debug-challenges/${createdChallengeId}/unpublish`, 'PATCH', null, adminToken);
    assert.equal(unpubRes.status, 200);
    assert.equal(unpubRes.body.data.status, 'draft');
    assert.equal(unpubRes.body.data.isActive, false);

    const deleteRes = await makeRequest(`/api/v1/admin/debug-challenges/${createdChallengeId}`, 'DELETE', null, adminToken);
    assert.equal(deleteRes.status, 200);
  });

  /* ==========================================================================
     9. WEEKLY TESTS ADMIN CRUD & PUBLISH/UNPUBLISH
     ========================================================================== */

  let createdTestId;

  test('22. Weekly Tests Create & Validation: Validates and creates a weekly test', async () => {
    const invalidRes = await makeRequest('/api/v1/admin/weekly-tests', 'POST', { title: 'Test' }, adminToken);
    assert.equal(invalidRes.status, 400);

    const res = await makeRequest(
      '/api/v1/admin/weekly-tests',
      'POST',
      {
        title: 'Weekly Assessment 5: Data Structures',
        description: 'Comprehensive test covering Trees, Graphs, and Hash Tables.',
        durationMinutes: 45,
        status: 'draft',
      },
      adminToken
    );

    assert.equal(res.status, 201);
    assert.equal(res.body.data.durationMinutes, 45);
    createdTestId = res.body.data._id;
  });

  test('23. Weekly Tests Publish & Unpublish: Toggles status', async () => {
    const pubRes = await makeRequest(`/api/v1/admin/weekly-tests/${createdTestId}/publish`, 'PATCH', null, adminToken);
    assert.equal(pubRes.status, 200);
    assert.equal(pubRes.body.data.status, 'published');

    const unpubRes = await makeRequest(`/api/v1/admin/weekly-tests/${createdTestId}/unpublish`, 'PATCH', null, adminToken);
    assert.equal(unpubRes.status, 200);
    assert.equal(unpubRes.body.data.status, 'draft');

    const deleteRes = await makeRequest(`/api/v1/admin/weekly-tests/${createdTestId}`, 'DELETE', null, adminToken);
    assert.equal(deleteRes.status, 200);
  });

  /* ==========================================================================
     10. COMPETITIONS ADMIN CRUD & PUBLISH/UNPUBLISH
     ========================================================================== */

  let createdCompetitionId;

  test('24. Competitions Create & Validation: Validates and creates a competition', async () => {
    const invalidRes = await makeRequest('/api/v1/admin/competitions', 'POST', { title: 'Comp' }, adminToken);
    assert.equal(invalidRes.status, 400);

    const res = await makeRequest(
      '/api/v1/admin/competitions',
      'POST',
      {
        title: 'CodeForge October Algorithmic Sprint',
        description: '2-hour speed coding contest.',
        startTime: new Date(Date.now() + 86400000).toISOString(),
        endTime: new Date(Date.now() + 86400000 + 7200000).toISOString(),
        status: 'draft',
      },
      adminToken
    );

    assert.equal(res.status, 201);
    assert.equal(res.body.data.title, 'CodeForge October Algorithmic Sprint');
    createdCompetitionId = res.body.data._id;
  });

  test('25. Competitions Publish & Unpublish: Toggles competition status', async () => {
    const pubRes = await makeRequest(`/api/v1/admin/competitions/${createdCompetitionId}/publish`, 'PATCH', null, adminToken);
    assert.equal(pubRes.status, 200);
    assert.equal(pubRes.body.data.status, 'published');

    const unpubRes = await makeRequest(`/api/v1/admin/competitions/${createdCompetitionId}/unpublish`, 'PATCH', null, adminToken);
    assert.equal(unpubRes.status, 200);
    assert.equal(unpubRes.body.data.status, 'draft');

    const deleteRes = await makeRequest(`/api/v1/admin/competitions/${createdCompetitionId}`, 'DELETE', null, adminToken);
    assert.equal(deleteRes.status, 200);
  });

  /* ==========================================================================
     11. BATCHES, PRICES & PURCHASES ADMIN MANAGEMENT
     ========================================================================== */

  let createdBatchId;
  let createdPurchaseId;

  test('26. Batches Create & Validation: Admin creates a new batch', async () => {
    // 1. Validation failure
    const invalidRes = await makeRequest('/api/v1/admin/batches', 'POST', { name: '' }, adminToken);
    assert.equal(invalidRes.status, 400);

    // 2. Successful creation
    const res = await makeRequest(
      '/api/v1/admin/batches',
      'POST',
      {
        name: 'Full-Stack Web Dev Winter Cohort',
        description: 'Comprehensive 12-week bootcamp.',
        features: ['Live Labs', 'Code Reviews'],
        price: 49,
        currency: '₹',
        status: 'active',
      },
      adminToken
    );

    assert.equal(res.status, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.name, 'Full-Stack Web Dev Winter Cohort');
    assert.equal(res.body.data.price, 49);
    createdBatchId = res.body.data._id;
  });

  test('27. Prices Update: Admin updates batch price without altering historical purchase amountPaid', async () => {
    // 1. Create a purchase order with price = 49
    const purchase = await Purchase.create({
      user: studentUser._id,
      batch: createdBatchId,
      orderId: `ord_test_${Date.now()}`,
      paymentId: `pay_test_${Date.now()}`,
      amountPaid: 49,
      currency: '₹',
      paymentStatus: 'completed',
      verifiedAt: new Date(),
    });
    createdPurchaseId = purchase._id;

    // 2. Admin updates batch price to ₹99
    const priceRes = await makeRequest(
      `/api/v1/admin/batches/${createdBatchId}/price`,
      'PUT',
      { price: 99, currency: '₹' },
      adminToken
    );

    assert.equal(priceRes.status, 200);
    assert.equal(priceRes.body.data.price, 99);

    // 3. Verify historical purchase record retains immutable amountPaid = 49
    const purchaseRes = await makeRequest(`/api/v1/admin/purchases/${createdPurchaseId}`, 'GET', null, adminToken);
    assert.equal(purchaseRes.status, 200);
    assert.equal(purchaseRes.body.data.amountPaid, 49); // Historical amountPaid preserved!
  });

  test('28. Purchases Read List: Admin views student purchase list with search and filtering', async () => {
    const res = await makeRequest('/api/v1/admin/purchases?paymentStatus=completed', 'GET', null, adminToken);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data.purchases));
    assert.ok(res.body.data.purchases.length >= 1);
  });

  test('29. Payment Status Verification: Admin views verified payment status', async () => {
    const res = await makeRequest(`/api/v1/admin/purchases/${createdPurchaseId}/verify-status`, 'GET', null, adminToken);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.paymentStatus, 'completed');
    assert.equal(res.body.data.isVerified, true);
  });

  test('30. Sensitive Credentials Isolation: Purchase details exclude sensitive credentials', async () => {
    const res = await makeRequest(`/api/v1/admin/purchases/${createdPurchaseId}`, 'GET', null, adminToken);

    assert.equal(res.status, 200);
    assert.equal(res.body.data.cardNumber, undefined);
    assert.equal(res.body.data.cvv, undefined);
    assert.equal(res.body.data.upiPin, undefined);
    assert.equal(res.body.data.bankingPassword, undefined);
  });
});
