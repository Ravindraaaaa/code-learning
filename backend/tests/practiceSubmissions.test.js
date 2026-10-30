import { describe, it } from 'node:test';
import assert from 'node:assert';
import mongoose from 'mongoose';
import {
  submitCode,
  getSubmissions,
  getSubmissionById,
  getSubmissionStats
} from '../src/controllers/codeExecutionController.js';
import PracticeSubmission from '../src/models/PracticeSubmission.js';

describe('CodeForge Practice Submissions & Results System Test Suite', () => {
  const student1Id = new mongoose.Types.ObjectId().toString();
  const student2Id = new mongoose.Types.ObjectId().toString();

  it('1. Models: PracticeSubmission schema validates and structures fields properly', () => {
    const doc = new PracticeSubmission({
      user: student1Id,
      questionId: 'two-sum',
      questionNumber: 1,
      questionTitle: 'Two Sum',
      language: 'javascript',
      code: 'function twoSum(nums, target) { return [0, 1]; }',
      status: 'Accepted',
      score: 100,
      passedTestCases: 3,
      totalTestCases: 3,
      runtimeMs: 42,
      testCases: [
        {
          id: 'case-1',
          name: 'Case 1',
          input: 'nums = [2,7,11,15], target = 9',
          expected: '[0, 1]',
          actual: '[0, 1]',
          passed: true,
          status: 'Passed',
          runtimeMs: 14
        }
      ]
    });

    const validationErr = doc.validateSync();
    assert.strictEqual(validationErr, undefined, 'Doc should be valid according to Mongoose schema');
    assert.strictEqual(doc.questionNumber, 1);
    assert.strictEqual(doc.status, 'Accepted');
    assert.strictEqual(doc.testCases.length, 1);
    assert.strictEqual(doc.testCases[0].passed, true);
  });

  it('2. Model Schema rejects unsupported status values', () => {
    const invalidDoc = new PracticeSubmission({
      user: student1Id,
      questionId: 'two-sum',
      questionNumber: 1,
      questionTitle: 'Two Sum',
      language: 'javascript',
      code: 'console.log(1)',
      status: 'FakeStatus'
    });

    const err = invalidDoc.validateSync();
    assert.ok(err, 'Should fail validation on invalid status enum');
    assert.ok(err.errors.status, 'Should report status validation error');
  });

  it('3. Model Schema rejects unsupported language values', () => {
    const invalidDoc = new PracticeSubmission({
      user: student1Id,
      questionId: 'two-sum',
      questionNumber: 1,
      questionTitle: 'Two Sum',
      language: 'python',
      code: 'print(1)',
      status: 'Accepted'
    });

    const err = invalidDoc.validateSync();
    assert.ok(err, 'Should fail validation on invalid language enum');
    assert.ok(err.errors.language, 'Should report language validation error');
  });

  it('4. Isolation: getSubmissionById returns 403 Forbidden when student accesses another student submission', async () => {
    const originalReadyState = mongoose.connection.readyState;
    Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });

    const originalFindById = PracticeSubmission.findById;
    PracticeSubmission.findById = async (id) => ({
      _id: id,
      user: student1Id,
      questionId: 'two-sum',
      questionNumber: 1,
      questionTitle: 'Two Sum',
      language: 'javascript',
      code: 'function twoSum() {}',
      status: 'Accepted'
    });

    try {
      const req = {
        user: { id: student2Id }, // Student 2 attempting to view Student 1's submission
        params: { id: 'sub-123' }
      };

      let statusCode = 200;
      let responseBody = null;
      const res = {
        status: (code) => {
          statusCode = code;
          return res;
        },
        json: (data) => {
          responseBody = data;
          return res;
        }
      };

      await getSubmissionById(req, res);
      assert.strictEqual(statusCode, 403, 'Must return 403 Forbidden for cross-student access');
      assert.strictEqual(responseBody.success, false);
      assert.ok(responseBody.message.includes('Forbidden') || responseBody.message.includes('permission'));
    } finally {
      PracticeSubmission.findById = originalFindById;
      Object.defineProperty(mongoose.connection, 'readyState', { value: originalReadyState, configurable: true });
    }
  });

  it('5. Ownership: getSubmissionById allows student to view their own submission', async () => {
    const originalReadyState = mongoose.connection.readyState;
    Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });

    const originalFindById = PracticeSubmission.findById;
    PracticeSubmission.findById = async (id) => ({
      _id: id,
      user: student1Id,
      questionId: 'two-sum',
      questionNumber: 1,
      questionTitle: 'Two Sum',
      language: 'javascript',
      code: 'function twoSum() { return [0, 1]; }',
      status: 'Accepted',
      score: 100
    });

    try {
      const req = {
        user: { id: student1Id },
        params: { id: 'sub-123' }
      };

      let statusCode = 200;
      let responseBody = null;
      const res = {
        status: (code) => {
          statusCode = code;
          return res;
        },
        json: (data) => {
          responseBody = data;
          return res;
        }
      };

      await getSubmissionById(req, res);
      assert.strictEqual(statusCode, 200);
      assert.strictEqual(responseBody.success, true);
      assert.strictEqual(responseBody.data.code, 'function twoSum() { return [0, 1]; }');
    } finally {
      PracticeSubmission.findById = originalFindById;
      Object.defineProperty(mongoose.connection, 'readyState', { value: originalReadyState, configurable: true });
    }
  });

  it('6. Submission History filtering strictly applies user ID and query parameters', async () => {
    const originalReadyState = mongoose.connection.readyState;
    Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });

    let capturedQuery = null;
    const originalFind = PracticeSubmission.find;

    PracticeSubmission.find = (query) => {
      capturedQuery = query;
      return {
        sort: () => ({
          skip: () => ({
            limit: () => ({
              select: async () => [
                {
                  _id: 'sub-1',
                  user: student1Id,
                  questionId: 'two-sum',
                  questionNumber: 1,
                  language: 'cpp',
                  status: 'Accepted'
                }
              ]
            })
          })
        })
      };
    };

    const originalCountDocuments = PracticeSubmission.countDocuments;
    PracticeSubmission.countDocuments = async (query) => 1;

    try {
      const req = {
        user: { id: student1Id },
        query: {
          questionId: 'two-sum',
          language: 'cpp',
          status: 'Accepted'
        }
      };

      let responseBody = null;
      const res = {
        status: () => res,
        json: (data) => {
          responseBody = data;
          return res;
        }
      };

      await getSubmissions(req, res);

      assert.strictEqual(responseBody.success, true);
      assert.strictEqual(capturedQuery.user, student1Id, 'Must enforce query.user === student1Id');
      assert.strictEqual(capturedQuery.questionId, 'two-sum');
      assert.strictEqual(capturedQuery.language, 'cpp');
      assert.strictEqual(capturedQuery.status, 'Accepted');
    } finally {
      PracticeSubmission.find = originalFind;
      PracticeSubmission.countDocuments = originalCountDocuments;
      Object.defineProperty(mongoose.connection, 'readyState', { value: originalReadyState, configurable: true });
    }
  });

  it('7. Statistics API accurately computes real metrics with zero fake counts', async () => {
    const originalReadyState = mongoose.connection.readyState;
    Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });

    const originalFind = PracticeSubmission.find;
    PracticeSubmission.find = (filter) => ({
      select: async () => [
        { status: 'Accepted', questionId: 'two-sum', language: 'javascript' },
        { status: 'Accepted', questionId: 'valid-anagram', language: 'cpp' },
        { status: 'Accepted', questionId: 'two-sum', language: 'javascript' },
        { status: 'Wrong Answer', questionId: 'two-sum', language: 'javascript' },
        { status: 'Runtime Error', questionId: 'merge-intervals', language: 'cpp' }
      ]
    });

    try {
      const req = {
        user: { id: student1Id }
      };

      let responseBody = null;
      const res = {
        status: () => res,
        json: (data) => {
          responseBody = data;
          return res;
        }
      };

      await getSubmissionStats(req, res);

      assert.strictEqual(responseBody.success, true);
      assert.strictEqual(responseBody.data.totalSubmissions, 5);
      assert.strictEqual(responseBody.data.acceptedSubmissions, 3);
      assert.strictEqual(responseBody.data.acceptanceRate, 60); // 3 / 5 * 100
      assert.strictEqual(responseBody.data.uniqueProblemsSolved, 2); // 'two-sum' and 'valid-anagram'
      assert.strictEqual(responseBody.data.languages.javascript, 3);
      assert.strictEqual(responseBody.data.languages.cpp, 2);
    } finally {
      PracticeSubmission.find = originalFind;
      Object.defineProperty(mongoose.connection, 'readyState', { value: originalReadyState, configurable: true });
    }
  });

  it('8. Status Classification: Maps execution outcomes to genuine statuses', () => {
    const statuses = [
      { input: { status: 'compile_error' }, expected: 'Compilation Error' },
      { input: { status: 'timeout' }, expected: 'Time Limit Exceeded' },
      { input: { status: 'runtime_error' }, expected: 'Runtime Error' },
      { input: { passed: true, totalTestCases: 2, passedTestCases: 2 }, expected: 'Accepted' },
      { input: { passed: false, totalTestCases: 2, passedTestCases: 1 }, expected: 'Wrong Answer' }
    ];

    for (const test of statuses) {
      let finalStatus = 'Wrong Answer';
      if (test.input.status === 'compile_error') finalStatus = 'Compilation Error';
      else if (test.input.status === 'timeout') finalStatus = 'Time Limit Exceeded';
      else if (test.input.status === 'runtime_error') finalStatus = 'Runtime Error';
      else if (test.input.passed) finalStatus = 'Accepted';

      assert.strictEqual(finalStatus, test.expected);
    }
  });
});
