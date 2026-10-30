import test from 'node:test';
import assert from 'node:assert/strict';
import { activateDevFallbackStore } from '../src/config/devFallbackStore.js';
import { DEFAULT_DEBUG_CHALLENGES } from '../src/data/defaultDebugChallenges.js';
import * as debugService from '../src/services/debugArenaService.js';
import codeExecutionService from '../src/services/codeExecutionService.js';

// Activate in-memory store for isolated unit tests
activateDevFallbackStore();

test('CodeForge Debug Arena Comprehensive Test Suite', async (t) => {
  await t.test('1. Challenge Bank Distribution & Integrity', () => {
    assert.strictEqual(DEFAULT_DEBUG_CHALLENGES.length, 15, 'Must contain exactly 15 challenges');

    const jsCount = DEFAULT_DEBUG_CHALLENGES.filter((c) => c.language === 'javascript').length;
    const cppCount = DEFAULT_DEBUG_CHALLENGES.filter((c) => c.language === 'cpp').length;
    const javaCount = DEFAULT_DEBUG_CHALLENGES.filter((c) => c.language === 'java').length;

    assert.strictEqual(jsCount, 5, 'Must contain 5 JavaScript challenges');
    assert.strictEqual(cppCount, 5, 'Must contain 5 C++ challenges');
    assert.strictEqual(javaCount, 5, 'Must contain 5 Java challenges');

    const easyCount = DEFAULT_DEBUG_CHALLENGES.filter((c) => c.difficulty === 'Easy').length;
    const medCount = DEFAULT_DEBUG_CHALLENGES.filter((c) => c.difficulty === 'Medium').length;
    const hardCount = DEFAULT_DEBUG_CHALLENGES.filter((c) => c.difficulty === 'Hard').length;

    assert.strictEqual(easyCount, 6, 'Must contain 6 Easy challenges');
    assert.strictEqual(medCount, 6, 'Must contain 6 Medium challenges');
    assert.strictEqual(hardCount, 3, 'Must contain 3 Hard challenges');

    // Every challenge must have buggyCode, solutionCode, description, hints, and testCases
    DEFAULT_DEBUG_CHALLENGES.forEach((c, idx) => {
      assert.ok(c.title, `Challenge #${idx + 1} must have a title`);
      assert.ok(c.buggyCode, `Challenge #${idx + 1} must have buggyCode`);
      assert.ok(c.solutionCode, `Challenge #${idx + 1} must have solutionCode`);
      assert.ok(c.description, `Challenge #${idx + 1} must have description`);
      assert.ok(Array.isArray(c.hints) && c.hints.length > 0, `Challenge #${idx + 1} must have hints`);
      assert.ok(Array.isArray(c.testCases) && c.testCases.length >= 2, `Challenge #${idx + 1} must have testCases`);
    });
  });

  await t.test('2. Schema Security: Solution Code & Hidden Test Cases are Masked', async () => {
    const challenge = await debugService.getChallengeByIdService('65f1d0000000000000000001');
    assert.ok(challenge, 'Challenge must exist');
    assert.strictEqual(challenge.solutionCode, undefined, 'solutionCode must never be leaked to students');

    const hiddenCase = challenge.testCases.find((tc) => tc.isHidden);
    if (hiddenCase) {
      assert.strictEqual(hiddenCase.input, undefined, 'Hidden test case input must be masked');
      assert.strictEqual(hiddenCase.expectedOutput, undefined, 'Hidden test case expectedOutput must be masked');
    }
  });

  await t.test('3. JavaScript Execution: Fix Bug in Challenge 1 (Off-By-One Palindrome)', async () => {
    const ch = DEFAULT_DEBUG_CHALLENGES[0]; // Off-By-One Palindrome
    // First verify buggy code fails
    const buggyRun = await codeExecutionService.submit(ch.language, ch.buggyCode, ch.testCases);
    assert.strictEqual(buggyRun.passed, false, 'Buggy code must fail test cases');

    // Verify fixed code passes
    const fixedRun = await codeExecutionService.submit(ch.language, ch.solutionCode, ch.testCases);
    assert.strictEqual(fixedRun.passed, true, 'Solution code must pass all test cases');
  });

  await t.test('4. C++ Execution: Fix Bug in Challenge 6 (Prefix Sum Array Out-Of-Bounds)', async () => {
    const ch = DEFAULT_DEBUG_CHALLENGES[5]; // C++ Challenge 6
    const fixedRun = await codeExecutionService.submit(ch.language, ch.solutionCode, ch.testCases);
    assert.strictEqual(fixedRun.passed, true, 'C++ solution code must pass all test cases');
  });

  await t.test('5. Java Execution: Fix Bug in Challenge 11 (Loop Boundary Array Reversal)', async () => {
    const ch = DEFAULT_DEBUG_CHALLENGES[10]; // Java Loop Boundary Array Reversal
    const fixedRun = await codeExecutionService.submit(ch.language, ch.solutionCode, ch.testCases);
    assert.strictEqual(fixedRun.passed, true, 'Java solution code must pass all test cases');
  });

  await t.test('6. Attempt Submission & Solved Tracking', async () => {
    const mockStudentId = '65f1c0000000000000000001';
    const ch = DEFAULT_DEBUG_CHALLENGES[0];

    // Submit solution code
    const attempt = await debugService.submitDebugAttemptService(mockStudentId, ch._id, ch.solutionCode);
    assert.strictEqual(attempt.status, 'Passed');
    assert.strictEqual(attempt.score, 100);

    // Retrieve attempts history
    const history = await debugService.getChallengeAttemptsService(mockStudentId, ch._id);
    assert.ok(history.length >= 1, 'Attempt must be recorded in history');
    assert.strictEqual(history[0].status, 'Passed');

    // Retrieve challenge as student: must be marked isSolved = true
    const updatedCh = await debugService.getChallengeByIdService(ch._id, mockStudentId);
    assert.strictEqual(updatedCh.isSolved, true, 'Challenge must be marked solved for this student');
  });

  await t.test('7. Progressive 3-Tier Hint System Validation & Penalty Calculation', async () => {
    // 1. Every challenge across C++, Java, and JS must have exactly 3 progressive hints
    DEFAULT_DEBUG_CHALLENGES.forEach((ch, idx) => {
      assert.strictEqual(ch.hints.length, 3, `Challenge #${idx + 1} (${ch.title}) must have exactly 3 hints`);
      assert.match(ch.hints[0], /^Category:/, `Challenge #${idx + 1} Hint 1 must provide category clue`);
      assert.match(ch.hints[1], /^Code Section:/, `Challenge #${idx + 1} Hint 2 must point to flawed code section`);
      assert.match(ch.hints[2], /^Concept:/, `Challenge #${idx + 1} Hint 3 must explain concept without revealing code`);
      // Never reveal raw solution replacement code in hint
      assert.strictEqual(ch.hints[2].includes('solutionCode'), false);
    });

    // 2. Hint penalty calculation: 1 hint used gives 5% penalty (score 95)
    const mockStudentId = '65f1c0000000000000000002';
    const ch = DEFAULT_DEBUG_CHALLENGES[0];
    const attemptWith1Hint = await debugService.submitDebugAttemptService(mockStudentId, ch._id, ch.solutionCode, 1);
    assert.strictEqual(attemptWith1Hint.status, 'Passed');
    assert.strictEqual(attemptWith1Hint.hintsUsed, 1);
    assert.strictEqual(attemptWith1Hint.hintPenalty, 5);
    assert.strictEqual(attemptWith1Hint.score, 95, 'Score should be 95 with 1 hint used');

    // 3. Hint penalty calculation: 2 hints used gives 10% penalty (score 90)
    const attemptWith2Hints = await debugService.submitDebugAttemptService(mockStudentId, ch._id, ch.solutionCode, 2);
    assert.strictEqual(attemptWith2Hints.status, 'Passed');
    assert.strictEqual(attemptWith2Hints.hintsUsed, 2);
    assert.strictEqual(attemptWith2Hints.hintPenalty, 10);
    assert.strictEqual(attemptWith2Hints.score, 90, 'Score should be 90 with 2 hints used');
  });
});
