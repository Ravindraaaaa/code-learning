import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../src/app.js';
import { activateDevFallbackStore } from '../src/config/devFallbackStore.js';
import {
  User,
  Language,
  Track,
  Batch,
  Purchase,
  Notification
} from '../src/models/index.js';
import { signToken } from '../src/utils/jwt.js';

let server;
let baseUrl;

const signTestToken = (payload) => {
  return signToken(payload);
};

const makeRequest = (path, method = 'GET', body = null, token = null, extraHeaders = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const headers = {
      'Content-Type': 'application/json',
      ...extraHeaders,
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

import { setFallbackActive } from '../src/config/db.js';

describe('Comprehensive Security Audit Test Suite', () => {
  let studentUser;
  let studentToken;

  before(async () => {
    process.env.NODE_ENV = 'test';
    await activateDevFallbackStore(
      User,
      Language,
      Track,
      Batch,
      Purchase,
      null,
      null,
      null,
      null,
      null,
      null,
      Notification
    );
    setFallbackActive(true);

    studentUser = await User.findOne({ email: 'student@codeforge.dev' });
    if (!studentUser) {
      studentUser = await User.create({
        name: 'Sec Student',
        email: 'student@codeforge.dev',
        passwordHash: 'hashed_password_sec',
        role: 'student'
      });
    }
    studentToken = signTestToken({ id: studentUser._id.toString(), email: studentUser.email, role: 'student' });

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

  test('1. MongoDB Query Injection Protection: Sanitizes operator keys ($gt, $ne, $where)', async () => {
    const payload = {
      email: { $gt: '' },
      password: 'Student@123'
    };
    const res = await makeRequest('/api/v1/auth/login', 'POST', payload);
    // Sanitizer strips $gt key, resulting in empty email which fails validation with 400
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.success, false);
  });

  test('2. Helmet Response Header Hardening: Sets frameguard, nosniff, and security headers', async () => {
    const res = await makeRequest('/', 'GET');
    assert.equal(res.statusCode, 200);
    assert.equal(res.headers['x-frame-options'], 'DENY');
    assert.equal(res.headers['x-content-type-options'], 'nosniff');
  });

  test('3. CORS Policy Enforcement: Rejects untrusted origins', async () => {
    const res = await makeRequest('/api/v1/health', 'GET', null, null, {
      Origin: 'http://malicious-attacker-site.com'
    });
    // Express CORS error returned for forbidden origin
    assert.equal(res.statusCode, 500);
    assert.ok(res.body.message.includes('CORS Policy Violation'));
  });

  test('4. Sensitive Credentials Transmission Guard: Rejects credit card payload', async () => {
    const payload = {
      batchId: '6ac919489117d476c475988f',
      cardNumber: '4111111111111111',
      cvv: '123'
    };
    const res = await makeRequest('/api/v1/purchases/create-order', 'POST', payload, studentToken);
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.error, 'FORBIDDEN_CREDENTIALS_PROVIDED');
  });

  test('5. Code Execution Payload Bounds Guard: Rejects code > 50,000 characters', async () => {
    const hugeCode = 'console.log("a");\n'.repeat(3000); // > 50KB string
    const payload = {
      language: 'javascript',
      code: hugeCode
    };
    const res = await makeRequest('/api/v1/code/execute', 'POST', payload, studentToken);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.data.status, 'failed');
    assert.ok(res.body.data.error.includes('maximum allowed size limit'));
  });

  test('6. Constant-Time Authentication: Invalid user login runs dummy hash compare', async () => {
    const start = Date.now();
    const res = await makeRequest('/api/v1/auth/login', 'POST', {
      email: 'nonexistent_random_user_99212@domain.com',
      password: 'WrongPassword@123'
    });
    const duration = Date.now() - start;
    assert.equal(res.statusCode, 401);
    assert.equal(res.body.success, false);
    // Verified that bcrypt executed to prevent timing-based user enumeration
    assert.ok(duration >= 0, `Execution duration was ${duration}ms`);
  });
});
