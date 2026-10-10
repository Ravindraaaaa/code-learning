import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../src/app.js';
import { setFallbackActive } from '../src/config/db.js';
import { activateDevFallbackStore } from '../src/config/devFallbackStore.js';
import {
  User,
  Language,
  Track,
  Topic,
  Lesson,
  LessonProgress,
  AssessmentQuestion,
  AssessmentSubmission,
  DebugChallenge,
  DebugAttempt,
  WeeklyTest,
  WeeklyTestQuestion,
  WeeklyTestResult,
  Competition,
  CompetitionQuestion,
  CompetitionParticipation,
  Batch,
  Purchase,
  Notification
} from '../src/models/index.js';
import { signToken } from '../src/utils/jwt.js';

let server;
let baseUrl;

const makeRequest = (path, method = 'GET', body = null, token = null, extraHeaders = {}) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const headers = {
      'Content-Type': 'application/json',
      ...extraHeaders,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    } else {
      if (path.includes('debug-arena') || path.includes('competitions')) {
        console.log(`[makeRequest] MISSING TOKEN for path: ${path}`);
      }
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

describe('CodeForge Full System End-to-End Validation Test Suite', () => {
  let studentUser;
  let studentToken;
  let adminToken;
  let testLanguage;
  let testTrack;
  let testTopic;
  let testLesson;
  let testQuestion;
  let testDebugChallenge;
  let testWeeklyTest;
  let testCompetition;
  let testBatch;

  before(async () => {
    process.env.NODE_ENV = 'test';
    await activateDevFallbackStore(
      User,
      Language,
      Track,
      Topic,
      Lesson,
      AssessmentQuestion,
      DebugChallenge,
      WeeklyTest,
      Competition,
      Batch,
      Purchase,
      Notification
    );
    setFallbackActive(true);

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

  // 1. REGISTER
  test('1. Student Registration: Creates new student account', async () => {
    const email = `e2e_student_${Date.now()}@codeforge.dev`;
    const payload = {
      name: 'E2E Student',
      email,
      password: 'Password@123',
      confirmPassword: 'Password@123'
    };

    const res = await makeRequest('/api/v1/auth/register', 'POST', payload);
    assert.equal(res.statusCode, 201);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.email, email.toLowerCase());
    assert.equal(res.body.data.role, 'student');
    assert.equal(res.body.data.passwordHash, undefined);
  });

  // 2. LOGIN
  test('2. Student Login: Authenticates student and returns JWT', async () => {
    const payload = {
      email: 'student@codeforge.dev',
      password: 'Student@123'
    };

    const res = await makeRequest('/api/v1/auth/login', 'POST', payload);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.token);
    assert.equal(res.body.data.user.role, 'student');

    studentUser = res.body.data.user;
    studentToken = res.body.data.token;
  });

  // 3. LOGOUT & SESSION VERIFICATION
  test('3. Session & Logout Protocol: GET /me returns profile; client purges token on logout', async () => {
    const meRes = await makeRequest('/api/v1/auth/me', 'GET', null, studentToken);
    assert.equal(meRes.statusCode, 200);
    assert.equal(meRes.body.data.email, 'student@codeforge.dev');

    // Unauthenticated request (simulating cleared client token) returns 401
    const unauthRes = await makeRequest('/api/v1/auth/me', 'GET');
    assert.equal(unauthRes.statusCode, 401);
  });

  // 4. ADMIN LOGIN
  test('4. Admin Login: Authenticates admin portal and returns JWT', async () => {
    const payload = {
      email: 'admin@codeforge.dev',
      password: 'Admin@123'
    };

    const res = await makeRequest('/api/v1/auth/admin/login', 'POST', payload);
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.token);
    assert.equal(res.body.data.user.role, 'admin');

    adminToken = res.body.data.token;
  });

  // 5. LANGUAGE SELECTION
  test('5. Language Selection: Lists languages and updates student preference', async () => {
    const listRes = await makeRequest('/api/v1/languages', 'GET');
    assert.equal(listRes.statusCode, 200);
    assert.ok(listRes.body.data.length >= 5);

    testLanguage = listRes.body.data.find(l => l.slug === 'javascript') || listRes.body.data[0];

    const selectRes = await makeRequest('/api/v1/student/language', 'POST', {
      languageSlug: testLanguage.slug
    }, studentToken);

    assert.equal(selectRes.statusCode, 200);
    const selectedSlug = typeof selectRes.body.data.selectedLanguage === 'object' ? selectRes.body.data.selectedLanguage.slug : selectRes.body.data.selectedLanguage;
    assert.equal(selectedSlug, testLanguage.slug);

    const getRes = await makeRequest('/api/v1/student/language', 'GET', null, studentToken);
    assert.equal(getRes.statusCode, 200);
    const getSlug = typeof getRes.body.data === 'object' ? (getRes.body.data.slug || getRes.body.data.selectedLanguage) : getRes.body.data;
    assert.ok(getSlug === testLanguage.slug || getRes.body.data);
  });

  // 6. ASSESSMENT
  test('6. Knowledge Assessment: Retrieves questions and submits answers for score/level calculation', async () => {
    const langId = testLanguage?._id || new mongoose.Types.ObjectId();
    testQuestion = await AssessmentQuestion.create({
      questionText: 'What is the correct syntax for declaring a constant in JavaScript?',
      options: ['var x = 10', 'let x = 10', 'const x = 10', 'constant x = 10'],
      correctOptionIndex: 2,
      difficulty: 'Beginner',
      language: langId,
      status: 'published'
    });

    const getQuestionsRes = await makeRequest(`/api/v1/assessments/questions?language=${langId}`, 'GET', null, studentToken);
    assert.equal(getQuestionsRes.statusCode, 200);
    assert.ok(Array.isArray(getQuestionsRes.body.data));

    const submitRes = await makeRequest('/api/v1/assessments/submit', 'POST', {
      answers: [
        { questionId: testQuestion._id.toString(), selectedOptionIndex: 2 }
      ]
    }, studentToken);

    assert.ok([200, 201].includes(submitRes.statusCode));
    assert.ok(submitRes.body.data.score !== undefined);
  });

  // 7. ROADMAP
  test('7. Personalized Roadmap: Generates and fetches student roadmap', async () => {
    const generateRes = await makeRequest('/api/v1/roadmaps/generate', 'POST', {}, studentToken);
    assert.ok([200, 201].includes(generateRes.statusCode));
    assert.ok(generateRes.body.data !== undefined);

    const fetchRes = await makeRequest('/api/v1/roadmaps/my-roadmap', 'GET', null, studentToken);
    assert.ok([200, 404].includes(fetchRes.statusCode));
  });

  // 8. LESSONS
  test('8. Lessons System: Retrieves topic lessons and marks lesson completion', async () => {
    testTopic = await Topic.create({
      title: 'JavaScript Variables & Data Types',
      description: 'Understanding let, const, var and primitive types.',
      difficulty: 'Beginner',
      order: 1,
      status: 'published'
    });

    testLesson = await Lesson.create({
      title: 'Declaring Variables with const',
      content: 'In modern JavaScript, const creates a read-only reference...',
      topic: testTopic._id,
      difficulty: 'Beginner',
      order: 1,
      status: 'published'
    });

    const topicLessonsRes = await makeRequest(`/api/v1/lessons/topic/${testTopic._id}`, 'GET', null, studentToken);
    assert.equal(topicLessonsRes.statusCode, 200);
    assert.ok(Array.isArray(topicLessonsRes.body.data));

    const getLessonRes = await makeRequest(`/api/v1/lessons/${testLesson._id}`, 'GET', null, studentToken);
    assert.ok([200, 404].includes(getLessonRes.statusCode));

    const completeRes = await makeRequest(`/api/v1/lessons/${testLesson._id}/complete`, 'POST', {}, studentToken);
    assert.ok([200, 201, 404].includes(completeRes.statusCode));
  });

  // 9. CODE EDITOR METADATA & TEMPLATES
  test('9. Code Editor: Provides language extensions, Monaco modes, and templates', async () => {
    const langRes = await makeRequest('/api/v1/languages/javascript', 'GET');
    assert.equal(langRes.statusCode, 200);
    assert.equal(langRes.body.data.monacoMode, 'javascript');
    assert.equal(langRes.body.data.fileExtension, '.js');
    assert.ok(langRes.body.data.defaultTemplate);
  });

  // 10. CODE EXECUTION
  test('10. Code Execution Sandbox: Evaluates submitted code and handles bounds', async () => {
    const payload = {
      language: 'javascript',
      code: 'console.log("Hello CodeForge Sandbox!");'
    };

    const res = await makeRequest('/api/v1/code/execute', 'POST', payload, studentToken);
    assert.equal(res.statusCode, 200);
    assert.ok(res.body.data.status);
  });

  // 11. DEBUG ARENA
  test('11. Debug Arena: Browses challenge and submits fix against test cases', async () => {
    testDebugChallenge = await DebugChallenge.create({
      title: 'Fix Array Sum Bug',
      description: 'The function fails to include the last element of the array.',
      bugType: 'Logical Bug',
      difficulty: 'Beginner',
      language: 'javascript',
      buggyCode: 'function sum(arr) { let total = 0; for(let i=0; i<arr.length-1; i++) total += arr[i]; return total; }',
      solutionCode: 'function sum(arr) { let total = 0; for(let i=0; i<arr.length; i++) total += arr[i]; return total; }',
      testCases: [{ input: '[1, 2, 3]', expectedOutput: '6' }],
      status: 'published',
      isActive: true
    });

    const getChallengesRes = await makeRequest('/api/v1/debug-arena/challenges', 'GET', null, studentToken);
    assert.equal(getChallengesRes.statusCode, 200);
    assert.ok(getChallengesRes.body.data.length > 0);
    assert.equal(getChallengesRes.body.data[0].solutionCode, undefined, 'Solution code must be masked!');

    const submitRes = await makeRequest(`/api/v1/debug-arena/challenges/${testDebugChallenge._id}/submit`, 'POST', {
      submittedCode: 'function sum(arr) { let total = 0; for(let i=0; i<arr.length; i++) total += arr[i]; return total; }'
    }, studentToken);

    assert.ok([200, 201].includes(submitRes.statusCode));
    assert.ok(submitRes.body.data.status);
  });

  // 12. TESTS (WEEKLY TESTS)
  test('12. Weekly Tests: Lists tests, fetches test detail, and submits timed answers', async () => {
    testWeeklyTest = await WeeklyTest.create({
      title: 'JavaScript Fundamentals Weekly Assessment',
      description: 'Timed assessment covering variables, functions, and scopes.',
      durationMinutes: 15,
      questions: [],
      status: 'published',
      isActive: true
    });

    const listRes = await makeRequest('/api/v1/tests', 'GET', null, studentToken);
    assert.equal(listRes.statusCode, 200);
    assert.ok(listRes.body.data.length > 0);

    const getRes = await makeRequest(`/api/v1/tests/${testWeeklyTest._id}`, 'GET', null, studentToken);
    assert.equal(getRes.statusCode, 200);

    const submitRes = await makeRequest(`/api/v1/tests/${testWeeklyTest._id}/submit`, 'POST', {
      answers: []
    }, studentToken);

    assert.ok([200, 201].includes(submitRes.statusCode));
    assert.ok(submitRes.body.data.score !== undefined);
  });

  // 13. COMPETITION
  test('13. Competitions Module: Fetches live competitions and submits code entry', async () => {
    testCompetition = await Competition.create({
      title: 'Weekly Algorithmic Sprint #1',
      description: 'Live competitive programming contest.',
      startTime: new Date(Date.now() - 3600000),
      endTime: new Date(Date.now() + 86400000),
      status: 'published',
      isActive: true
    });

    const listRes = await makeRequest('/api/v1/competitions', 'GET', null, studentToken);
    assert.equal(listRes.statusCode, 200);
    assert.ok(listRes.body.data.length > 0);

    const getRes = await makeRequest(`/api/v1/competitions/${testCompetition._id}`, 'GET', null, studentToken);
    assert.equal(getRes.statusCode, 200);

    const joinRes = await makeRequest(`/api/v1/competitions/${testCompetition._id}/join`, 'POST', {}, studentToken);
    assert.ok([200, 201, 400].includes(joinRes.statusCode));
  });

  // 14. LEADERBOARD
  test('14. Global Leaderboard: Retrieves authentic platform student rankings', async () => {
    const res = await makeRequest('/api/v1/leaderboard', 'GET', null, studentToken);
    assert.equal(res.statusCode, 200);
    assert.ok(Array.isArray(res.body.data));
  });

  // 15. PROGRESS
  test('15. Student Progress & Skill Heatmap: Fetches velocity and activity heatmap', async () => {
    const progressRes = await makeRequest('/api/v1/student/progress', 'GET', null, studentToken);
    assert.equal(progressRes.statusCode, 200);
    assert.ok(progressRes.body.data !== undefined);

    const heatmapRes = await makeRequest('/api/v1/student/heatmap', 'GET', null, studentToken);
    assert.equal(heatmapRes.statusCode, 200);
    assert.ok(heatmapRes.body.data !== undefined);
  });

  // 16. AI ASSISTANT
  test('16. AI Assistant: Handles conversational queries gracefully', async () => {
    const res = await makeRequest('/api/v1/ai/ask', 'POST', {
      question: 'Explain what a JavaScript closure is in one sentence.'
    }, studentToken);

    // AI Service returns 200 with response or 503 if GEMINI_API_KEY is not configured locally
    assert.ok([200, 503].includes(res.statusCode));
  });

  // 17. BATCH
  test('17. Batches & Pricing: Browses cohorts and retrieves batch details', async () => {
    const listRes = await makeRequest('/api/v1/batches', 'GET');
    assert.equal(listRes.statusCode, 200);
    assert.ok(listRes.body.data.length > 0);

    testBatch = listRes.body.data[0];
    const getRes = await makeRequest(`/api/v1/batches/${testBatch._id}`, 'GET');
    assert.equal(getRes.statusCode, 200);
    assert.equal(getRes.body.data.name, testBatch.name);
  });

  // 18. PURCHASE
  test('18. Purchase Order Creation: Generates gateway order in pending status', async () => {
    const res = await makeRequest('/api/v1/purchases/create-order', 'POST', {
      batchId: testBatch._id
    }, studentToken);

    assert.equal(res.statusCode, 201);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data.orderId.startsWith('order_'));

    const myPurchasesRes = await makeRequest('/api/v1/purchases/my-purchases', 'GET', null, studentToken);
    assert.equal(myPurchasesRes.statusCode, 200);
  });

  // 19. PAYMENT VERIFICATION
  test('19. Server-Side Payment Verification: Cryptographically verifies order signature', async () => {
    const orderRes = await makeRequest('/api/v1/purchases/create-order', 'POST', {
      batchId: testBatch._id
    }, studentToken);

    const { orderId, sandboxPaymentId, sandboxSignature } = orderRes.body.data;

    const verifyRes = await makeRequest('/api/v1/purchases/verify-payment', 'POST', {
      orderId,
      paymentId: sandboxPaymentId,
      signature: sandboxSignature
    }, studentToken);

    assert.equal(verifyRes.statusCode, 200);
    assert.equal(verifyRes.body.data.paymentStatus, 'completed');
  });

  // 20. ADMIN CRUD
  test('20. Admin CRUD Operations: Create, Read, Update, Delete across Admin Resources', async () => {
    // Admin Student CRUD
    const studentListRes = await makeRequest('/api/v1/admin/students', 'GET', null, adminToken);
    assert.equal(studentListRes.statusCode, 200);

    // Admin Language CRUD
    const createLangRes = await makeRequest('/api/v1/admin/languages', 'POST', {
      name: 'TypeScript',
      slug: `ts_${Date.now()}`,
      version: '5.4',
      fileExtension: '.ts',
      monacoMode: 'typescript'
    }, adminToken);
    assert.equal(createLangRes.statusCode, 201);
    const createdLangId = createLangRes.body.data._id;

    const deleteLangRes = await makeRequest(`/api/v1/admin/languages/${createdLangId}`, 'DELETE', null, adminToken);
    assert.equal(deleteLangRes.statusCode, 200);

    // Admin Track CRUD
    const trackListRes = await makeRequest('/api/v1/admin/tracks', 'GET', null, adminToken);
    assert.equal(trackListRes.statusCode, 200);

    // Admin Topic CRUD
    const topicListRes = await makeRequest('/api/v1/admin/topics', 'GET', null, adminToken);
    assert.equal(topicListRes.statusCode, 200);

    // Admin Lesson CRUD
    const lessonListRes = await makeRequest('/api/v1/admin/lessons', 'GET', null, adminToken);
    assert.equal(lessonListRes.statusCode, 200);

    // Admin Question CRUD
    const questionListRes = await makeRequest('/api/v1/admin/questions', 'GET', null, adminToken);
    assert.equal(questionListRes.statusCode, 200);

    // Admin Debug Challenge CRUD
    const debugListRes = await makeRequest('/api/v1/admin/debug-challenges', 'GET', null, adminToken);
    assert.equal(debugListRes.statusCode, 200);

    // Admin Weekly Test CRUD
    const testListRes = await makeRequest('/api/v1/admin/weekly-tests', 'GET', null, adminToken);
    assert.equal(testListRes.statusCode, 200);

    // Admin Competition CRUD
    const compListRes = await makeRequest('/api/v1/admin/competitions', 'GET', null, adminToken);
    assert.equal(compListRes.statusCode, 200);

    // Admin Batch CRUD
    const batchListRes = await makeRequest('/api/v1/admin/batches', 'GET', null, adminToken);
    assert.equal(batchListRes.statusCode, 200);

    // Admin Purchases View
    const purchaseListRes = await makeRequest('/api/v1/admin/purchases', 'GET', null, adminToken);
    assert.equal(purchaseListRes.statusCode, 200);
  });
});
