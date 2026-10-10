import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../src/app.js';
import { activateDevFallbackStore } from '../src/config/devFallbackStore.js';
import { User, Language, Track, Batch, Purchase } from '../src/models/index.js';
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

describe('Server-Side Payment Verification & Content Activation Test Suite', () => {
  let studentToken;
  let student2Token;
  let adminToken;
  let studentUser;
  let student2User;
  let adminUser;
  let testBatch;

  before(async () => {
    // Activate fallback store for isolated predictable in-memory testing
    await activateDevFallbackStore(User, Language, Track, Batch, Purchase);

    // Setup HTTP test server on random port
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://localhost:${port}`;
        resolve();
      });
    });

    // Create test accounts
    studentUser = await User.create({
      name: 'Verification Student',
      email: 'verifystudent@codeforge.dev',
      passwordHash: 'hash',
      role: 'student',
    });

    student2User = await User.create({
      name: 'Other Student 2',
      email: 'otherstudent2@codeforge.dev',
      passwordHash: 'hash',
      role: 'student',
    });

    adminUser = await User.create({
      name: 'Verification Admin',
      email: 'verifyadmin@codeforge.dev',
      passwordHash: 'hash',
      role: 'admin',
    });

    studentToken = signTestToken({ id: studentUser._id, email: studentUser.email, role: 'student' });
    student2Token = signTestToken({ id: student2User._id, email: student2User.email, role: 'student' });
    adminToken = signTestToken({ id: adminUser._id, email: adminUser.email, role: 'admin' });

    // Create a batch with price ₹49
    testBatch = await Batch.create({
      name: 'Server Verification Cohort',
      description: 'Testing gateway signature verification and strict content activation.',
      price: 49,
      currency: '₹',
      status: 'active',
    });
  });

  after((done) => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  test('1. Security Policy: Blocks payment endpoints if sensitive credentials (cardNumber, CVV, upiPin) are transmitted', async () => {
    const res = await makeRequest(
      '/api/v1/purchases/create-order',
      'POST',
      {
        batchId: testBatch._id,
        cardNumber: '4111111111111111',
        cvv: '999',
      },
      studentToken
    );

    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
    assert.equal(res.body.error, 'FORBIDDEN_CREDENTIALS_PROVIDED');
  });

  test('2. Order Creation: Generates gateway order in PENDING status without activating content', async () => {
    const orderRes = await makeRequest(
      '/api/v1/purchases/create-order',
      'POST',
      { batchId: testBatch._id },
      studentToken
    );

    assert.equal(orderRes.status, 201);
    assert.equal(orderRes.body.success, true);
    assert.ok(orderRes.body.data.orderId.startsWith('order_'));
    assert.equal(orderRes.body.data.amount, 49);

    // Unverified pending order MUST NOT activate content in student purchases
    const myPurchasesRes = await makeRequest(
      '/api/v1/purchases/my-purchases',
      'GET',
      null,
      studentToken
    );

    assert.equal(myPurchasesRes.status, 200);
    assert.equal(myPurchasesRes.body.data.length, 0, 'Content must NOT be activated for pending orders!');
  });

  test('3. Fake Payment Rejection: Rejects invalid/fake signature with 400 and keeps content locked', async () => {
    const orderRes = await makeRequest(
      '/api/v1/purchases/create-order',
      'POST',
      { batchId: testBatch._id },
      student2Token
    );

    const orderId = orderRes.body.data.orderId;

    // Send forged / fake signature to verify endpoint
    const verifyRes = await makeRequest(
      '/api/v1/purchases/verify-payment',
      'POST',
      {
        orderId,
        paymentId: 'pay_fake_123',
        signature: 'invalid_forged_signature_123',
      },
      student2Token
    );

    assert.equal(verifyRes.status, 400);
    assert.equal(verifyRes.body.success, false);
    assert.match(verifyRes.body.message, /Server-side payment verification failed/);

    // Verify content remains unactivated for student 2
    const myPurchasesRes = await makeRequest(
      '/api/v1/purchases/my-purchases',
      'GET',
      null,
      student2Token
    );

    assert.equal(myPurchasesRes.body.data.length, 0, 'Fake signature must NOT activate content!');
  });

  test('4. Authentic Verification & Content Activation: Server verifies gateway signature and activates content', async () => {
    // 1. Create order
    const orderRes = await makeRequest(
      '/api/v1/purchases/create-order',
      'POST',
      { batchId: testBatch._id },
      studentToken
    );

    const { orderId, sandboxPaymentId, sandboxSignature } = orderRes.body.data;

    // 2. Verify with authentic sandbox signature calculated by gateway
    const verifyRes = await makeRequest(
      '/api/v1/purchases/verify-payment',
      'POST',
      {
        orderId,
        paymentId: sandboxPaymentId,
        signature: sandboxSignature,
        paymentMethod: 'GATEWAY_SANDBOX',
      },
      studentToken
    );

    assert.equal(verifyRes.status, 200);
    assert.equal(verifyRes.body.success, true);
    assert.equal(verifyRes.body.data.paymentStatus, 'completed');
    assert.equal(verifyRes.body.data.amountPaid, 49);
    assert.ok(verifyRes.body.data.verifiedAt);

    // 3. Content is NOW ACTIVATED in student's account
    const myPurchasesRes = await makeRequest(
      '/api/v1/purchases/my-purchases',
      'GET',
      null,
      studentToken
    );

    assert.equal(myPurchasesRes.status, 200);
    assert.equal(myPurchasesRes.body.data.length, 1);
    assert.equal(myPurchasesRes.body.data[0].amountPaid, 49);
    assert.equal(myPurchasesRes.body.data[0].paymentStatus, 'completed');
  });

  test('5. Safe Metadata Storage Verification: Ensures ONLY orderId, paymentId, amount, currency, status are stored', async () => {
    const myPurchasesRes = await makeRequest(
      '/api/v1/purchases/my-purchases',
      'GET',
      null,
      studentToken
    );

    const purchase = myPurchasesRes.body.data[0];
    assert.ok(purchase.orderId);
    assert.ok(purchase.paymentId);
    assert.equal(purchase.amountPaid, 49);
    assert.equal(purchase.currency, '₹');
    assert.equal(purchase.paymentStatus, 'completed');

    // Confirm zero forbidden keys in JSON output
    assert.equal(purchase.cardNumber, undefined);
    assert.equal(purchase.cvv, undefined);
    assert.equal(purchase.upiPin, undefined);
    assert.equal(purchase.bankingPassword, undefined);
  });

  test('6. Price Immutability: When Admin updates batch price (₹49 -> ₹99), existing purchase amountPaid permanently remains ₹49', async () => {
    // 1. Admin updates batch price to ₹99
    const updateRes = await makeRequest(
      `/api/v1/admin/batches/${testBatch._id}`,
      'PUT',
      { price: 99 },
      adminToken
    );
    assert.equal(updateRes.status, 200);
    assert.equal(updateRes.body.data.price, 99);

    // 2. Student queries their past purchase receipt
    const myPurchasesRes = await makeRequest(
      '/api/v1/purchases/my-purchases',
      'GET',
      null,
      studentToken
    );

    assert.equal(myPurchasesRes.status, 200);
    assert.equal(myPurchasesRes.body.data.length, 1);
    // The amountPaid field on the purchase document must remain ₹49
    assert.equal(
      myPurchasesRes.body.data[0].amountPaid,
      49,
      'Old purchase amountPaid must remain ₹49 even after Admin changes batch price to ₹99'
    );
    // The current batch price returned via populated batch object reflects the new price ₹99
    assert.equal(
      myPurchasesRes.body.data[0].batch.price,
      99,
      'Populated batch.price reflects current admin price ₹99 while purchase amountPaid remains frozen at ₹49'
    );
  });
});

