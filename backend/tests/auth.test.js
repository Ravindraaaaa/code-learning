import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { validateRegisterInput, validateLoginInput } from '../src/validators/authValidators.js';
import { signToken, verifyToken } from '../src/utils/jwt.js';
import { requireAuth, requireRole } from '../src/middleware/authMiddleware.js';
import { requireAdmin } from '../src/middleware/adminMiddleware.js';
import { isDBConnected } from '../src/config/db.js';
import { registerStudent, loginStudent, loginAdmin, getStudentProfile, getUserProfile } from '../src/services/authService.js';
import { getStudentDashboardData } from '../src/services/dashboardService.js';
import { User, Language } from '../src/models/index.js';
import {
  DEFAULT_LANGUAGES,
  getAllLanguages,
  getLanguageBySlug,
  selectStudentLanguage,
  getStudentSelectedLanguage,
} from '../src/services/languageService.js';



describe('Student Authentication Comprehensive Test Suite', () => {

  // =========================================================================
  // 1. MONGODB CONNECTION & DISCONNECTED STATE
  // =========================================================================
  describe('1. MongoDB Connection Handling', () => {
    test('isDBConnected accurately reports disconnected when readyState is not 1', () => {
      const connected = isDBConnected();
      // By default if no local mongod is running, readyState is 0 or 2 (not 1)
      assert.equal(typeof connected, 'boolean');
      assert.equal(connected, mongoose.connection.readyState === 1);
    });

    test('registerStudent throws 503 when database is disconnected', async () => {
      if (!isDBConnected()) {
        await assert.rejects(
          async () => {
            await registerStudent({
              name: 'Offline Student',
              email: 'offline@codeforge.dev',
              password: 'Password123',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 503);
            assert.match(err.message, /Database service is currently unavailable/);
            return true;
          }
        );
      }
    });

    test('loginStudent throws 503 when database is disconnected', async () => {
      if (!isDBConnected()) {
        await assert.rejects(
          async () => {
            await loginStudent({
              email: 'offline@codeforge.dev',
              password: 'Password123',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 503);
            assert.match(err.message, /Database service is currently unavailable/);
            return true;
          }
        );
      }
    });
  });

  // =========================================================================
  // 2. MISSING FIELDS VALIDATION
  // =========================================================================
  describe('2. Missing Fields Validation', () => {
    test('validateRegisterInput fails when body is completely empty', () => {
      const result = validateRegisterInput({});
      assert.equal(result.isValid, false);
      assert.ok(result.errors.name);
      assert.ok(result.errors.email);
      assert.ok(result.errors.password);
    });

    test('validateRegisterInput fails when name is missing or whitespace', () => {
      const result = validateRegisterInput({
        name: '   ',
        email: 'student@example.com',
        password: 'Password123',
      });
      assert.equal(result.isValid, false);
      assert.equal(result.errors.name, 'Full name is required');
    });

    test('validateRegisterInput fails when email is missing', () => {
      const result = validateRegisterInput({
        name: 'John Doe',
        email: '',
        password: 'Password123',
      });
      assert.equal(result.isValid, false);
      assert.equal(result.errors.email, 'Email address is required');
    });

    test('validateRegisterInput fails when password is missing', () => {
      const result = validateRegisterInput({
        name: 'John Doe',
        email: 'john@example.com',
        password: '',
      });
      assert.equal(result.isValid, false);
      assert.equal(result.errors.password, 'Password is required');
    });

    test('validateLoginInput fails when email or password is missing', () => {
      const result = validateLoginInput({});
      assert.equal(result.isValid, false);
      assert.equal(result.errors.email, 'Email address is required');
      assert.equal(result.errors.password, 'Password is required');
    });
  });

  // =========================================================================
  // 3. INVALID EMAIL VALIDATION
  // =========================================================================
  describe('3. Invalid Email Validation', () => {
    const invalidEmails = [
      'notanemail',
      'user@',
      '@domain.com',
      'user@domain',
      'user name@domain.com',
      'user@.com',
    ];

    test('validateRegisterInput rejects malformed email formats', () => {
      for (const email of invalidEmails) {
        const result = validateRegisterInput({
          name: 'Valid Name',
          email,
          password: 'Password123',
        });
        assert.equal(result.isValid, false, `Expected ${email} to be invalid`);
        assert.equal(result.errors.email, 'Please provide a valid email address');
      }
    });

    test('validateLoginInput rejects malformed email formats', () => {
      for (const email of invalidEmails) {
        const result = validateLoginInput({
          email,
          password: 'Password123',
        });
        assert.equal(result.isValid, false, `Expected ${email} to be invalid in login`);
        assert.equal(result.errors.email, 'Please provide a valid email address');
      }
    });

    test('validateRegisterInput accepts valid RFC-compliant emails', () => {
      const result = validateRegisterInput({
        name: 'Valid Name',
        email: 'student.algo@university.edu',
        password: 'Password123',
      });
      assert.equal(result.isValid, true);
      assert.equal(result.errors, null);
    });
  });

  // =========================================================================
  // 4. PASSWORD CONSTRAINTS
  // =========================================================================
  describe('4. Password Constraints', () => {
    test('validateRegisterInput rejects password shorter than 8 characters', () => {
      const result = validateRegisterInput({
        name: 'Valid Name',
        email: 'student@example.com',
        password: 'short',
      });
      assert.equal(result.isValid, false);
      assert.equal(result.errors.password, 'Password must be at least 8 characters long');
    });

    test('validateRegisterInput accepts password with 8 or more characters', () => {
      const result = validateRegisterInput({
        name: 'Valid Name',
        email: 'student@example.com',
        password: 'EightChar!',
      });
      assert.equal(result.isValid, true);
    });
  });

  // =========================================================================
  // 5. REGISTER, DUPLICATE EMAIL, WRONG PASSWORD, & CORRECT LOGIN (In-Memory User Simulation)
  // =========================================================================
  describe('5. Auth Business Logic (Bcrypt Hashing, Duplicate Email, Wrong Password, Correct Login)', () => {
    // Simulated database for integration tests
    const inMemoryDB = new Map();

    // Mock User methods to run deterministic flow
    const origFindOne = User.findOne;
    const origCreate = User.create;
    const origFindById = User.findById;

    before(() => {
      User.findOne = async ({ email }) => {
        const user = inMemoryDB.get(email.toLowerCase());
        if (!user) return null;
        return {
          ...user,
          toJSON: () => {
            const copy = { ...user };
            delete copy.passwordHash;
            return copy;
          },
        };
      };

      User.create = async (doc) => {
        const saved = {
          _id: new mongoose.Types.ObjectId(),
          ...doc,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        inMemoryDB.set(doc.email.toLowerCase(), saved);
        return {
          ...saved,
          toJSON: () => {
            const copy = { ...saved };
            delete copy.passwordHash;
            return copy;
          },
        };
      };

      User.findById = async (id) => {
        for (const user of inMemoryDB.values()) {
          if (user._id.toString() === id.toString()) {
            return {
              ...user,
              toJSON: () => {
                const copy = { ...user };
                delete copy.passwordHash;
                return copy;
              },
            };
          }
        }
        return null;
      };
    });

    after(() => {
      User.findOne = origFindOne;
      User.create = origCreate;
      User.findById = origFindById;
      inMemoryDB.clear();
    });

    // Helper to bypass isDBConnected check for this business logic block
    const runWithSimulatedConnection = async (fn) => {
      const origReadyState = mongoose.connection.readyState;
      Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });
      try {
        return await fn();
      } finally {
        Object.defineProperty(mongoose.connection, 'readyState', { value: origReadyState, configurable: true });
      }
    };

    test('Register hashes password with bcrypt and never returns passwordHash', async () => {
      await runWithSimulatedConnection(async () => {
        const result = await registerStudent({
          name: 'Alice Student',
          email: 'alice@codeforge.dev',
          password: 'SuperSecretPassword123',
        });

        assert.equal(result.name, 'Alice Student');
        assert.equal(result.email, 'alice@codeforge.dev');
        assert.equal(result.role, 'student');
        assert.equal(result.passwordHash, undefined, 'passwordHash must never be exposed');

        // Verify stored in DB with bcrypt hash
        const inDB = inMemoryDB.get('alice@codeforge.dev');
        assert.ok(inDB.passwordHash);
        assert.notEqual(inDB.passwordHash, 'SuperSecretPassword123');
        assert.ok(inDB.passwordHash.startsWith('$2'));

        // Verify bcrypt hash matches
        const isValid = await bcrypt.compare('SuperSecretPassword123', inDB.passwordHash);
        assert.equal(isValid, true);
      });
    });

    test('Duplicate email registration is rejected with 409 Conflict', async () => {
      await runWithSimulatedConnection(async () => {
        await assert.rejects(
          async () => {
            await registerStudent({
              name: 'Alice Clone',
              email: 'ALICE@codeforge.dev', // case insensitive
              password: 'AnotherPassword123',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 409);
            assert.match(err.message, /already exists/);
            return true;
          }
        );
      });
    });

    test('Login with non-existent email is rejected with 401', async () => {
      await runWithSimulatedConnection(async () => {
        await assert.rejects(
          async () => {
            await loginStudent({
              email: 'nonexistent@codeforge.dev',
              password: 'Password123',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 401);
            assert.equal(err.message, 'Invalid email or password');
            return true;
          }
        );
      });
    });

    test('Login with wrong password is rejected with 401', async () => {
      await runWithSimulatedConnection(async () => {
        await assert.rejects(
          async () => {
            await loginStudent({
              email: 'alice@codeforge.dev',
              password: 'WrongPassword456!',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 401);
            assert.equal(err.message, 'Invalid email or password');
            return true;
          }
        );
      });
    });

    test('Login with correct password returns user and valid JWT token', async () => {
      await runWithSimulatedConnection(async () => {
        const result = await loginStudent({
          email: 'alice@codeforge.dev',
          password: 'SuperSecretPassword123',
        });

        assert.ok(result.user);
        assert.equal(result.user.name, 'Alice Student');
        assert.equal(result.user.email, 'alice@codeforge.dev');
        assert.equal(result.user.role, 'student');
        assert.equal(result.user.passwordHash, undefined);

        assert.ok(result.token);
        const decoded = verifyToken(result.token);
        assert.equal(decoded.email, 'alice@codeforge.dev');
        assert.equal(decoded.role, 'student');
        assert.ok(decoded.id);
      });
    });

    test('Login blocks non-student role with 403 Forbidden', async () => {
      await runWithSimulatedConnection(async () => {
        // Register an admin user in simulated DB
        const adminHash = await bcrypt.hash('AdminSecret123', 10);
        inMemoryDB.set('admin@codeforge.dev', {
          _id: new mongoose.Types.ObjectId(),
          name: 'Site Admin',
          email: 'admin@codeforge.dev',
          passwordHash: adminHash,
          role: 'admin',
        });

        await assert.rejects(
          async () => {
            await loginStudent({
              email: 'admin@codeforge.dev',
              password: 'AdminSecret123',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 403);
            assert.match(err.message, /reserved for students/);
            return true;
          }
        );
      });
    });

    test('getStudentProfile returns safe user without passwordHash', async () => {
      await runWithSimulatedConnection(async () => {
        const student = inMemoryDB.get('alice@codeforge.dev');
        const profile = await getStudentProfile(student._id);

        assert.equal(profile.name, 'Alice Student');
        assert.equal(profile.email, 'alice@codeforge.dev');
        assert.equal(profile.passwordHash, undefined);
      });
    });
  });

  // =========================================================================
  // 6. JWT TOKENS: VALID, INVALID, & EXPIRED
  // =========================================================================
  describe('6. JWT Token Verification Middleware', () => {
    const mockRes = () => {
      const res = {
        statusCode: 200,
        body: null,
        status(code) {
          this.statusCode = code;
          return this;
        },
        json(data) {
          this.body = data;
          return this;
        },
      };
      return res;
    };

    test('requireAuth rejects request missing Authorization header with 401', () => {
      const req = { headers: {} };
      const res = mockRes();
      let nextCalled = false;

      requireAuth(req, res, () => { nextCalled = true; });

      assert.equal(nextCalled, false);
      assert.equal(res.statusCode, 401);
      assert.equal(res.body.success, false);
      assert.equal(res.body.message, 'Authentication token is required');
    });

    test('requireAuth rejects request with non-Bearer Authorization header with 401', () => {
      const req = { headers: { authorization: 'Basic 12345' } };
      const res = mockRes();
      let nextCalled = false;

      requireAuth(req, res, () => { nextCalled = true; });

      assert.equal(nextCalled, false);
      assert.equal(res.statusCode, 401);
      assert.equal(res.body.message, 'Authentication token is required');
    });

    test('requireAuth rejects invalid / tampered token with 401', () => {
      const req = { headers: { authorization: 'Bearer invalid.tampered.token123' } };
      const res = mockRes();
      let nextCalled = false;

      requireAuth(req, res, () => { nextCalled = true; });

      assert.equal(nextCalled, false);
      assert.equal(res.statusCode, 401);
      assert.equal(res.body.message, 'Invalid authentication token');
    });

    test('requireAuth rejects expired token with 401 and specific expiration message', async () => {
      // Create a token that expired 10 seconds ago
      const expiredToken = signToken(
        { id: '123', email: 'test@codeforge.dev', role: 'student' },
        { expiresIn: '-10s' }
      );

      const req = { headers: { authorization: `Bearer ${expiredToken}` } };
      const res = mockRes();
      let nextCalled = false;

      requireAuth(req, res, () => { nextCalled = true; });

      assert.equal(nextCalled, false);
      assert.equal(res.statusCode, 401);
      assert.equal(res.body.message, 'Token has expired. Please log in again.');
    });

    test('requireAuth accepts valid token and populates req.user', () => {
      const validToken = signToken({
        id: 'user_456',
        email: 'valid@codeforge.dev',
        role: 'student',
      });

      const req = { headers: { authorization: `Bearer ${validToken}` } };
      const res = mockRes();
      let nextCalled = false;

      requireAuth(req, res, () => { nextCalled = true; });

      assert.equal(nextCalled, true);
      assert.ok(req.user);
      assert.equal(req.user.id, 'user_456');
      assert.equal(req.user.email, 'valid@codeforge.dev');
      assert.equal(req.user.role, 'student');
    });

    test('requireRole enforces role authorization', () => {
      const reqStudent = { user: { role: 'student' } };
      const reqAdmin = { user: { role: 'admin' } };
      const res = mockRes();

      let studentPassed = false;
      requireRole('student')(reqStudent, res, () => { studentPassed = true; });
      assert.equal(studentPassed, true);

      let adminPassed = false;
      const resBlocked = mockRes();
      requireRole('student')(reqAdmin, resBlocked, () => { adminPassed = true; });
      assert.equal(adminPassed, false);
      assert.equal(resBlocked.statusCode, 403);
      assert.match(resBlocked.body.message, /Requires student privileges/);
    });
  });

  // Frontend auth helper logic for client simulation tests
  const parseJwtPayload = (token) => {
    if (!token || typeof token !== 'string') return null;
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const json = Buffer.from(payloadBase64, 'base64').toString('utf8');
      return JSON.parse(json);
    } catch {
      return null;
    }
  };

  const isTokenExpired = (token) => {
    const payload = parseJwtPayload(token);
    if (!payload || !payload.exp) return true;
    return payload.exp <= Math.floor(Date.now() / 1000);
  };

  // =========================================================================
  // 7. FRONTEND AUTH UTILITY TESTS (Page Refresh, Logout, Token Expiration)
  // =========================================================================
  describe('7. Frontend Client Auth Flow (Storage, Page Refresh, Expiration, Logout)', () => {

    // Simulated localStorage
    const mockStorage = new Map();
    const storageApi = {
      getItem: (key) => mockStorage.get(key) || null,
      setItem: (key, val) => mockStorage.set(key, String(val)),
      removeItem: (key) => mockStorage.delete(key),
      clear: () => mockStorage.clear(),
    };

    const getStoredAuth = () => {
      const token = storageApi.getItem('codeforge_token');
      const userJson = storageApi.getItem('codeforge_user');
      if (!token || !userJson) return null;
      if (isTokenExpired(token)) {
        storageApi.removeItem('codeforge_token');
        storageApi.removeItem('codeforge_user');
        return null;
      }
      try {
        return { token, user: JSON.parse(userJson) };
      } catch {
        storageApi.removeItem('codeforge_token');
        storageApi.removeItem('codeforge_user');
        return null;
      }
    };

    const setStoredAuth = ({ user, token }) => {
      storageApi.setItem('codeforge_token', token);
      storageApi.setItem('codeforge_user', JSON.stringify(user));
    };

    const clearStoredAuth = () => {
      storageApi.removeItem('codeforge_token');
      storageApi.removeItem('codeforge_user');
    };

    before(() => {
      mockStorage.clear();
    });

    test('parseJwtPayload correctly extracts claims from standard JWT', () => {
      const token = signToken({ id: 'id_789', email: 'jwt@codeforge.dev', role: 'student' });
      const payload = parseJwtPayload(token);
      assert.ok(payload);
      assert.equal(payload.id, 'id_789');
      assert.equal(payload.email, 'jwt@codeforge.dev');
      assert.equal(payload.role, 'student');
      assert.ok(payload.exp);
    });

    test('parseJwtPayload returns null on malformed or garbage strings', () => {
      assert.equal(parseJwtPayload(''), null);
      assert.equal(parseJwtPayload('random-string'), null);
      assert.equal(parseJwtPayload('a.b'), null);
    });

    test('isTokenExpired returns false for active token and true for expired token', () => {
      const activeToken = signToken({ id: '1' }, { expiresIn: '1h' });
      assert.equal(isTokenExpired(activeToken), false);

      const expiredToken = signToken({ id: '1' }, { expiresIn: '-10s' });
      assert.equal(isTokenExpired(expiredToken), true);
    });

    test('Page refresh with valid token restores authenticated session', () => {
      const token = signToken({ id: 'student_1', email: 'student1@dev.io', role: 'student' });
      const user = { id: 'student_1', name: 'Student One', email: 'student1@dev.io', role: 'student' };

      setStoredAuth({ user, token });

      // Simulate page refresh: call getStoredAuth()
      const restored = getStoredAuth();
      assert.ok(restored);
      assert.equal(restored.token, token);
      assert.equal(restored.user.name, 'Student One');
    });

    test('Page refresh with expired token automatically clears storage and rejects session', () => {
      const expiredToken = signToken({ id: 'student_2' }, { expiresIn: '-1m' });
      const user = { id: 'student_2', name: 'Student Two' };

      setStoredAuth({ user, token: expiredToken });

      // Storage has items initially
      assert.ok(storageApi.getItem('codeforge_token'));

      // Simulate page refresh
      const restored = getStoredAuth();
      assert.equal(restored, null);

      // Storage should have been cleansed of the expired credentials
      assert.equal(storageApi.getItem('codeforge_token'), null);
      assert.equal(storageApi.getItem('codeforge_user'), null);
    });

    test('Page refresh with corrupt JSON automatically clears storage', () => {
      storageApi.setItem('codeforge_token', signToken({ id: 'student_3' }));
      storageApi.setItem('codeforge_user', '{bad-json');

      const restored = getStoredAuth();
      assert.equal(restored, null);
      assert.equal(storageApi.getItem('codeforge_token'), null);
    });

    test('Logout clears storage and leaves user unauthenticated', () => {
      const token = signToken({ id: 'student_4' });
      const user = { id: 'student_4', name: 'Student Four' };

      setStoredAuth({ user, token });
      assert.ok(getStoredAuth());

      // User triggers Logout
      clearStoredAuth();

      assert.equal(getStoredAuth(), null);
      assert.equal(storageApi.getItem('codeforge_token'), null);
      assert.equal(storageApi.getItem('codeforge_user'), null);
    });

    test('ProtectedRoute behavior: Unauthenticated / expired redirects to login', () => {
      // Simulate unauthenticated
      clearStoredAuth();
      const isAuthed = Boolean(getStoredAuth()?.token);
      assert.equal(isAuthed, false); // ProtectedRoute redirects to /login

      // Simulate authenticated
      const validToken = signToken({ id: 'student_5' });
      setStoredAuth({ user: { name: 'Student Five' }, token: validToken });
      const isNowAuthed = Boolean(getStoredAuth()?.token);
      assert.equal(isNowAuthed, true); // ProtectedRoute renders children
    });
  });

  // =========================================================================
  // 8. ADMIN AUTHENTICATION & STUDENT VS ADMIN ACCESS ENFORCEMENT
  // =========================================================================
  describe('8. Admin Authentication & Student vs Admin Access Enforcement', () => {
    const adminTestDB = new Map();

    const origFindOne = User.findOne;
    const origFindById = User.findById;

    before(async () => {
      const studentHash = await bcrypt.hash('StudentPass123', 10);
      const adminHash = await bcrypt.hash('AdminSecret123', 10);

      const studentUser = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Student User',
        email: 'verified.student@codeforge.dev',
        passwordHash: studentHash,
        role: 'student',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const adminUser = {
        _id: new mongoose.Types.ObjectId(),
        name: 'Super Admin',
        email: 'verified.admin@codeforge.dev',
        passwordHash: adminHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      adminTestDB.set(studentUser.email.toLowerCase(), studentUser);
      adminTestDB.set(adminUser.email.toLowerCase(), adminUser);

      User.findOne = async ({ email }) => {
        const user = adminTestDB.get(email.toLowerCase());
        if (!user) return null;
        return {
          ...user,
          toJSON: () => {
            const copy = { ...user };
            delete copy.passwordHash;
            return copy;
          },
        };
      };

      User.findById = async (id) => {
        for (const user of adminTestDB.values()) {
          if (user._id.toString() === id.toString()) {
            return {
              ...user,
              toJSON: () => {
                const copy = { ...user };
                delete copy.passwordHash;
                return copy;
              },
            };
          }
        }
        return null;
      };
    });

    after(() => {
      User.findOne = origFindOne;
      User.findById = origFindById;
      adminTestDB.clear();
    });

    const runWithSimulatedConnection = async (fn) => {
      const origReadyState = mongoose.connection.readyState;
      Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });
      try {
        return await fn();
      } finally {
        Object.defineProperty(mongoose.connection, 'readyState', { value: origReadyState, configurable: true });
      }
    };

    // 1. Admin Login Happy Path
    test('loginAdmin successfully authenticates valid admin credentials', async () => {
      await runWithSimulatedConnection(async () => {
        const result = await loginAdmin({
          email: 'verified.admin@codeforge.dev',
          password: 'AdminSecret123',
        });

        assert.ok(result.user);
        assert.equal(result.user.name, 'Super Admin');
        assert.equal(result.user.email, 'verified.admin@codeforge.dev');
        assert.equal(result.user.role, 'admin');
        assert.equal(result.user.passwordHash, undefined, 'passwordHash must never be exposed');

        assert.ok(result.token);
        const decoded = verifyToken(result.token);
        assert.equal(decoded.email, 'verified.admin@codeforge.dev');
        assert.equal(decoded.role, 'admin');
        assert.ok(decoded.id);
      });
    });

    // 2. Student Rejected from Admin Login
    test('loginAdmin rejects student account with 403 Forbidden', async () => {
      await runWithSimulatedConnection(async () => {
        await assert.rejects(
          async () => {
            await loginAdmin({
              email: 'verified.student@codeforge.dev',
              password: 'StudentPass123',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 403);
            assert.match(err.message, /reserved for administrators/i);
            return true;
          }
        );
      });
    });

    // 3. Admin Rejected from Student Login
    test('loginStudent rejects admin account with 403 Forbidden', async () => {
      await runWithSimulatedConnection(async () => {
        await assert.rejects(
          async () => {
            await loginStudent({
              email: 'verified.admin@codeforge.dev',
              password: 'AdminSecret123',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 403);
            assert.match(err.message, /reserved for students/i);
            return true;
          }
        );
      });
    });

    // 4. Admin Login with Wrong Password
    test('loginAdmin rejects incorrect password with 401 Unauthorized', async () => {
      await runWithSimulatedConnection(async () => {
        await assert.rejects(
          async () => {
            await loginAdmin({
              email: 'verified.admin@codeforge.dev',
              password: 'WrongPassword999!',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 401);
            assert.equal(err.message, 'Invalid email or password');
            return true;
          }
        );
      });
    });

    // 5. Admin Login with Non-Existent Email
    test('loginAdmin rejects non-existent email with 401 Unauthorized', async () => {
      await runWithSimulatedConnection(async () => {
        await assert.rejects(
          async () => {
            await loginAdmin({
              email: 'ghost.admin@codeforge.dev',
              password: 'AdminSecret123',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 401);
            assert.equal(err.message, 'Invalid email or password');
            return true;
          }
        );
      });
    });

    // 6. Database Disconnection during Admin Login
    test('loginAdmin throws 503 when database is disconnected', async () => {
      if (!isDBConnected()) {
        await assert.rejects(
          async () => {
            await loginAdmin({
              email: 'verified.admin@codeforge.dev',
              password: 'AdminSecret123',
            });
          },
          (err) => {
            assert.equal(err.statusCode, 503);
            assert.match(err.message, /Database service is currently unavailable/);
            return true;
          }
        );
      }
    });

    // 7. requireAdmin Authorization Middleware
    test('requireAdmin rejects unauthenticated request missing req.user with 401', () => {
      const req = {};
      const res = {
        statusCode: 0,
        body: null,
        status(code) { this.statusCode = code; return this; },
        json(data) { this.body = data; return this; },
      };
      let nextCalled = false;

      requireAdmin(req, res, () => { nextCalled = true; });

      assert.equal(nextCalled, false);
      assert.equal(res.statusCode, 401);
      assert.match(res.body.message, /Authentication token is required/);
    });

    test('requireAdmin rejects authenticated student with 403 Forbidden', () => {
      const req = {
        user: { id: 'student_123', email: 'student@dev.io', role: 'student' },
      };
      const res = {
        statusCode: 0,
        body: null,
        status(code) { this.statusCode = code; return this; },
        json(data) { this.body = data; return this; },
      };
      let nextCalled = false;

      requireAdmin(req, res, () => { nextCalled = true; });

      assert.equal(nextCalled, false);
      assert.equal(res.statusCode, 403);
      assert.match(res.body.message, /Requires admin privileges/);
    });

    test('requireAdmin allows authenticated admin and executes next()', () => {
      const req = {
        user: { id: 'admin_123', email: 'admin@dev.io', role: 'admin' },
      };
      const res = {
        statusCode: 0,
        body: null,
        status(code) { this.statusCode = code; return this; },
        json(data) { this.body = data; return this; },
      };
      let nextCalled = false;

      requireAdmin(req, res, () => { nextCalled = true; });

      assert.equal(nextCalled, true);
      assert.equal(res.statusCode, 0);
    });

    // 8. requireRole vs Student / Admin Cross-Access
    test('requireRole separates student and admin privilege boundaries', () => {
      const studentUser = { id: 's1', role: 'student' };
      const adminUser = { id: 'a1', role: 'admin' };

      const checkRole = (role, user) => {
        let called = false;
        let forbidden = false;
        const middleware = requireRole(role);
        const req = { user };
        const res = {
          status(code) { if (code === 403) forbidden = true; return this; },
          json() { return this; },
        };
        middleware(req, res, () => { called = true; });
        return { called, forbidden };
      };

      // Student accessing student resource -> permitted
      const studentToStudent = checkRole('student', studentUser);
      assert.equal(studentToStudent.called, true);
      assert.equal(studentToStudent.forbidden, false);

      // Student accessing admin resource -> forbidden
      const studentToAdmin = checkRole('admin', studentUser);
      assert.equal(studentToAdmin.called, false);
      assert.equal(studentToAdmin.forbidden, true);

      // Admin accessing admin resource -> permitted
      const adminToAdmin = checkRole('admin', adminUser);
      assert.equal(adminToAdmin.called, true);
      assert.equal(adminToAdmin.forbidden, false);

      // Admin accessing student resource -> forbidden (strict role boundaries)
      const adminToStudent = checkRole('student', adminUser);
      assert.equal(adminToStudent.called, false);
      assert.equal(adminToStudent.forbidden, true);
    });

    // 9. Client-Side Access Enforcement (Student vs Admin Route Guards)
    test('Client-side route guards strictly differentiate student and admin permissions', () => {
      const studentSession = {
        user: { id: 's1', role: 'student' },
        token: signToken({ id: 's1', role: 'student' }),
      };

      const adminSession = {
        user: { id: 'a1', role: 'admin' },
        token: signToken({ id: 'a1', role: 'admin' }),
      };

      // Route Guard evaluations
      const evaluateAdminRoute = (session) => {
        if (!session?.token || isTokenExpired(session.token)) return 'REDIRECT_LOGIN';
        if (session.user.role !== 'admin') return 'ACCESS_DENIED';
        return 'RENDER_CHILDREN';
      };

      const evaluateStudentProtectedRoute = (session, allowedRoles = ['student']) => {
        if (!session?.token || isTokenExpired(session.token)) return 'REDIRECT_LOGIN';
        if (!allowedRoles.includes(session.user.role)) return 'ACCESS_DENIED';
        return 'RENDER_CHILDREN';
      };

      // Unauthenticated visitor
      assert.equal(evaluateAdminRoute(null), 'REDIRECT_LOGIN');
      assert.equal(evaluateStudentProtectedRoute(null), 'REDIRECT_LOGIN');

      // Student accessing Student Route -> ALLOWED
      assert.equal(evaluateStudentProtectedRoute(studentSession), 'RENDER_CHILDREN');

      // Student accessing Admin Route -> DENIED
      assert.equal(evaluateAdminRoute(studentSession), 'ACCESS_DENIED');

      // Admin accessing Admin Route -> ALLOWED
      assert.equal(evaluateAdminRoute(adminSession), 'RENDER_CHILDREN');

      // Admin accessing Student Route -> DENIED
      assert.equal(evaluateStudentProtectedRoute(adminSession), 'ACCESS_DENIED');
    });
  });

  // =========================================================================
  // 9. REAL DATABASE-DRIVEN STUDENT DASHBOARD (ZERO FAKE STATISTICS)
  // =========================================================================
  describe('9. Real Database-Driven Student Dashboard (Zero Fake Statistics)', () => {
    const dashboardTestDB = new Map();
    const origFindById = User.findById;

    const freshStudentId = new mongoose.Types.ObjectId();
    const activeStudentId = new mongoose.Types.ObjectId();

    before(() => {
      // 1. Fresh student with 0 progress / no fake stats
      dashboardTestDB.set(freshStudentId.toString(), {
        _id: freshStudentId,
        name: 'Brand New Student',
        email: 'fresh.student@codeforge.dev',
        role: 'student',
        roadmap: { enrolled: false },
        learningProgress: { topicsCompleted: 0, totalTopics: 0, percentage: 0 },
        streak: { currentStreak: 0, longestStreak: 0, lastActiveDate: null },
        skills: [],
        testPerformance: { testsTaken: 0, averageScore: 0, recentTests: [] },
        recentActivity: [],
        createdAt: new Date(),
      });

      // 2. Active student with real recorded database milestones
      dashboardTestDB.set(activeStudentId.toString(), {
        _id: activeStudentId,
        name: 'Active Coder',
        email: 'active.coder@codeforge.dev',
        role: 'student',
        roadmap: {
          enrolled: true,
          title: 'Data Structures & Algorithms in JavaScript',
          trackId: 'dsa-js',
          currentModule: 'Binary Search Trees',
          completedModules: 4,
          totalModules: 12,
        },
        learningProgress: {
          topicsCompleted: 14,
          totalTopics: 50,
          percentage: 28,
          lastCompletedTopic: 'Recursion Fundamentals',
        },
        streak: {
          currentStreak: 5,
          longestStreak: 12,
          lastActiveDate: new Date(),
          freezeDaysAvailable: 2,
        },
        skills: [
          { name: 'Arrays & Strings', level: 'Intermediate', score: 72, problemsSolved: 18 },
          { name: 'Trees & Graphs', level: 'Beginner', score: 35, problemsSolved: 6 },
        ],
        testPerformance: {
          testsTaken: 2,
          averageScore: 84,
          highestScore: 92,
          lastTestDate: new Date(),
          recentTests: [
            { testId: 't1', title: 'Data Structures Assessment 1', score: 85, maxScore: 100 },
          ],
        },
        recentActivity: [
          {
            activityType: 'problem_solved',
            title: 'Binary Search Implementation',
            detail: 'Passed all 15 test cases',
            timestamp: new Date(),
          },
        ],
        createdAt: new Date(),
      });

      User.findById = async (id) => {
        const doc = dashboardTestDB.get(id.toString());
        return doc || null;
      };
    });

    after(() => {
      User.findById = origFindById;
      dashboardTestDB.clear();
    });

    const runWithSimulatedConnection = async (fn) => {
      const origReadyState = mongoose.connection.readyState;
      Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });
      try {
        return await fn();
      } finally {
        Object.defineProperty(mongoose.connection, 'readyState', { value: origReadyState, configurable: true });
      }
    };

    test('Fresh student receives authentic 0s and nulls with zero fake statistics', async () => {
      await runWithSimulatedConnection(async () => {
        const data = await getStudentDashboardData(freshStudentId);

        assert.ok(data);
        assert.equal(data.student.name, 'Brand New Student');
        // Roadmap must be null (not enrolled)
        assert.equal(data.roadmap, null);
        // Learning progress must be 0
        assert.equal(data.learningProgress.topicsCompleted, 0);
        assert.equal(data.learningProgress.percentage, 0);
        // Streak must be 0
        assert.equal(data.streak.currentStreak, 0);
        assert.equal(data.streak.longestStreak, 0);
        // Skills must be empty array
        assert.deepEqual(data.skills, []);
        // Test performance must have 0 tests
        assert.equal(data.testPerformance.testsTaken, 0);
        assert.deepEqual(data.testPerformance.recentTests, []);
        // Recent activity must be empty array
        assert.deepEqual(data.recentActivity, []);
        // Recommendations must provide initial onboarding paths
        assert.ok(data.recommendations.length > 0);
        assert.ok(data.recommendations.some((r) => r.id === 'rec-roadmap'));
      });
    });

    test('Active student receives genuine recorded database data', async () => {
      await runWithSimulatedConnection(async () => {
        const data = await getStudentDashboardData(activeStudentId);

        assert.ok(data);
        assert.equal(data.student.name, 'Active Coder');
        assert.ok(data.roadmap);
        assert.equal(data.roadmap.enrolled, true);
        assert.equal(data.roadmap.title, 'Data Structures & Algorithms in JavaScript');
        assert.equal(data.learningProgress.percentage, 28);
        assert.equal(data.streak.currentStreak, 5);
        assert.equal(data.skills.length, 2);
        assert.equal(data.skills[0].name, 'Arrays & Strings');
        assert.equal(data.testPerformance.testsTaken, 2);
        assert.equal(data.recentActivity.length, 1);
        assert.equal(data.recentActivity[0].title, 'Binary Search Implementation');
      });
    });

    test('getStudentDashboardData throws 404 for non-existent student', async () => {
      await runWithSimulatedConnection(async () => {
        const ghostId = new mongoose.Types.ObjectId();
        await assert.rejects(
          async () => {
            await getStudentDashboardData(ghostId);
          },
          (err) => {
            assert.equal(err.statusCode, 404);
            assert.match(err.message, /not found/i);
            return true;
          }
        );
      });
    });

    test('getStudentDashboardData throws 503 when database is disconnected', async () => {
      if (!isDBConnected()) {
        await assert.rejects(
          async () => {
            await getStudentDashboardData(freshStudentId);
          },
          (err) => {
            assert.equal(err.statusCode, 503);
            assert.match(err.message, /Database service is currently unavailable/);
            return true;
          }
        );
      }
    });
  });

  // =========================================================================
  // 10. PROGRAMMING LANGUAGES (C, C++, JAVA, PYTHON, JAVASCRIPT) & STUDENT SELECTION
  // =========================================================================
  describe('10. Programming Languages & Student Selection', () => {
    let origFind;
    let origFindOne;
    let origCountDocuments;
    let origFindById;
    const testLanguagesDB = new Map();
    const testUsersDB = new Map();

    const studentUserId = new mongoose.Types.ObjectId();

    before(() => {
      origFind = Language.find;
      origFindOne = Language.findOne;
      origCountDocuments = Language.countDocuments;
      origFindById = User.findById;

      // Seed mock languages
      for (const lang of DEFAULT_LANGUAGES) {
        testLanguagesDB.set(lang.slug, {
          ...lang,
          _id: new mongoose.Types.ObjectId(),
        });
      }

      // Seed mock student
      testUsersDB.set(studentUserId.toString(), {
        _id: studentUserId,
        name: 'Algorithmic Learner',
        email: 'learner@codeforge.dev',
        role: 'student',
        selectedLanguage: null,
        recentActivity: [],
        save: async function () {
          testUsersDB.set(this._id.toString(), this);
          return this;
        },
      });

      Language.countDocuments = async () => testLanguagesDB.size;

      Language.find = (query = {}) => {
        const list = Array.from(testLanguagesDB.values()).filter((l) => {
          if (query.isActive !== undefined) return l.isActive === query.isActive;
          return true;
        });
        return {
          sort: () => list.sort((a, b) => a.displayOrder - b.displayOrder),
        };
      };

      Language.findOne = async (query = {}) => {
        if (query.slug) {
          return testLanguagesDB.get(query.slug) || null;
        }
        return null;
      };

      User.findById = async (id) => {
        const user = testUsersDB.get(id.toString());
        return user || null;
      };
    });

    after(() => {
      Language.find = origFind;
      Language.findOne = origFindOne;
      Language.countDocuments = origCountDocuments;
      User.findById = origFindById;
      testLanguagesDB.clear();
      testUsersDB.clear();
    });

    const runWithSimulatedConnection = async (fn) => {
      const origReadyState = mongoose.connection.readyState;
      Object.defineProperty(mongoose.connection, 'readyState', { value: 1, configurable: true });
      try {
        return await fn();
      } finally {
        Object.defineProperty(mongoose.connection, 'readyState', { value: origReadyState, configurable: true });
      }
    };

    test('Canonical platform languages contain exactly C, C++, Java, Python, and JavaScript', () => {
      assert.equal(DEFAULT_LANGUAGES.length, 5);
      const names = DEFAULT_LANGUAGES.map((l) => l.name);
      assert.deepEqual(names, ['C', 'C++', 'Java', 'Python', 'JavaScript']);

      for (const lang of DEFAULT_LANGUAGES) {
        assert.ok(lang.slug, `Language ${lang.name} must have a slug`);
        assert.ok(lang.version, `Language ${lang.name} must specify compiler/runtime version`);
        assert.ok(lang.fileExtension, `Language ${lang.name} must have a fileExtension`);
        assert.ok(lang.monacoMode, `Language ${lang.name} must have monacoMode`);
        assert.ok(lang.defaultTemplate, `Language ${lang.name} must have default starter template`);
        assert.equal(lang.isActive, true);
      }
    });

    test('Language schema validates required fields properly', () => {
      const invalidLang = new Language({});
      const err = invalidLang.validateSync();
      assert.ok(err);
      assert.ok(err.errors['name']);
      assert.ok(err.errors['slug']);
      assert.ok(err.errors['version']);
      assert.ok(err.errors['fileExtension']);
      assert.ok(err.errors['monacoMode']);
    });

    test('getAllLanguages retrieves all 5 active languages in display order', async () => {
      await runWithSimulatedConnection(async () => {
        const languages = await getAllLanguages();
        assert.equal(languages.length, 5);
        assert.equal(languages[0].name, 'C');
        assert.equal(languages[1].name, 'C++');
        assert.equal(languages[2].name, 'Java');
        assert.equal(languages[3].name, 'Python');
        assert.equal(languages[4].name, 'JavaScript');
      });
    });

    test('getLanguageBySlug accurately resolves language metadata', async () => {
      await runWithSimulatedConnection(async () => {
        const python = await getLanguageBySlug('python');
        assert.ok(python);
        assert.equal(python.name, 'Python');
        assert.equal(python.fileExtension, '.py');
        assert.equal(python.version, 'Python 3.12');

        const cpp = await getLanguageBySlug('cpp');
        assert.ok(cpp);
        assert.equal(cpp.name, 'C++');
        assert.equal(cpp.fileExtension, '.cpp');
      });
    });

    test('Student initially has no selected language', async () => {
      await runWithSimulatedConnection(async () => {
        const status = await getStudentSelectedLanguage(studentUserId);
        assert.equal(status.selectedLanguageSlug, null);
        assert.equal(status.language, null);
      });
    });

    test('Student can select a supported programming language (Python)', async () => {
      await runWithSimulatedConnection(async () => {
        const result = await selectStudentLanguage(studentUserId, 'python');
        assert.ok(result);
        assert.equal(result.student.selectedLanguage, 'python');
        assert.equal(result.selectedLanguage.name, 'Python');

        // Verify persisted in user record
        const user = testUsersDB.get(studentUserId.toString());
        assert.equal(user.selectedLanguage, 'python');
        assert.ok(user.recentActivity.some((a) => a.title.includes('Python')));

        // Verify getStudentSelectedLanguage reflects change
        const current = await getStudentSelectedLanguage(studentUserId);
        assert.equal(current.selectedLanguageSlug, 'python');
        assert.equal(current.language.name, 'Python');
      });
    });

    test('Student can switch language to C++', async () => {
      await runWithSimulatedConnection(async () => {
        const result = await selectStudentLanguage(studentUserId, 'cpp');
        assert.ok(result);
        assert.equal(result.student.selectedLanguage, 'cpp');
        assert.equal(result.selectedLanguage.name, 'C++');

        const current = await getStudentSelectedLanguage(studentUserId);
        assert.equal(current.selectedLanguageSlug, 'cpp');
      });
    });

    test('selectStudentLanguage rejects unsupported language with 400 Bad Request', async () => {
      await runWithSimulatedConnection(async () => {
        await assert.rejects(
          async () => {
            await selectStudentLanguage(studentUserId, 'cobol');
          },
          (err) => {
            assert.equal(err.statusCode, 400);
            assert.match(err.message, /Unsupported programming language/i);
            return true;
          }
        );
      });
    });

    test('selectStudentLanguage throws 404 for non-existent student', async () => {
      await runWithSimulatedConnection(async () => {
        const fakeUserId = new mongoose.Types.ObjectId();
        await assert.rejects(
          async () => {
            await selectStudentLanguage(fakeUserId, 'java');
          },
          (err) => {
            assert.equal(err.statusCode, 404);
            assert.match(err.message, /Student account not found/i);
            return true;
          }
        );
      });
    });

    test('Language endpoints throw 503 when database is disconnected', async () => {
      if (!isDBConnected()) {
        await assert.rejects(
          async () => {
            await getAllLanguages();
          },
          (err) => {
            assert.equal(err.statusCode, 503);
            return true;
          }
        );

        await assert.rejects(
          async () => {
            await selectStudentLanguage(studentUserId, 'javascript');
          },
          (err) => {
            assert.equal(err.statusCode, 503);
            return true;
          }
        );
      }
    });
  });

});


