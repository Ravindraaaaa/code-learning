import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { DEFAULT_LANGUAGES } from '../services/languageService.js';
import { DEFAULT_TRACKS } from '../services/trackService.js';
import { DEFAULT_BATCHES } from '../services/batchService.js';
import { DEFAULT_DEBUG_CHALLENGES } from '../data/defaultDebugChallenges.js';
import { logger } from '../utils/logger.js';
import * as allModels from '../models/index.js';

let fallbackActive = false;
const inMemoryUsers = new Map();
const inMemoryLanguages = new Map();
const inMemoryTracks = new Map();
const inMemoryTopics = new Map();
const inMemoryBatches = new Map();
const inMemoryPurchases = new Map();
const inMemoryLessons = new Map();
const inMemoryQuestions = new Map();
const inMemoryDebugChallenges = new Map();
const inMemoryDebugAttempts = new Map();
const inMemoryWeeklyTests = new Map();
const inMemoryCompetitions = new Map();
const inMemoryNotifications = new Map();
const inMemoryRoadmaps = new Map();

const buildChain = (resultsArray) => {
  let list = Array.from(resultsArray || []);
  const chain = {
    select: function () {
      return chain;
    },
    sort: function (sortObj) {
      if (sortObj && typeof sortObj === 'object') {
        const key = Object.keys(sortObj)[0];
        const dir = sortObj[key] === -1 ? -1 : 1;
        list.sort((a, b) => {
          if (a[key] < b[key]) return -1 * dir;
          if (a[key] > b[key]) return 1 * dir;
          return 0;
        });
      }
      return chain;
    },
    skip: function (n) {
      const skipCount = Math.max(0, parseInt(n, 10) || 0);
      list = list.slice(skipCount);
      return chain;
    },
    limit: function (n) {
      const limitCount = Math.max(0, parseInt(n, 10) || 0);
      list = list.slice(0, limitCount);
      return chain;
    },
    populate: function (path) {
      const paths = Array.isArray(path) ? path : [path];
      list.forEach((item) => {
        if (item && typeof item.populate === 'function') {
          paths.forEach((p) => {
            const pPath = typeof p === 'string' ? p : (p && p.path ? p.path : '');
            if (pPath) item.populate(pPath);
          });
        }
      });
      return chain;
    },
    lean: function () {
      return chain;
    },
    exec: () => Promise.resolve(list),
    then: (resolve, reject) => Promise.resolve(list).then(resolve, reject),
    catch: (reject) => Promise.resolve(list).catch(reject),
  };
  return chain;
};

const buildSingleChain = (res = null) => {
  const chain = {
    select: () => chain,
    sort: () => chain,
    skip: () => chain,
    limit: () => chain,
    populate: function (path) {
      if (res && typeof res.populate === 'function') {
        const paths = Array.isArray(path) ? path : [path];
        paths.forEach((p) => {
          const pPath = typeof p === 'string' ? p : (p && p.path ? p.path : '');
          if (pPath) res.populate(pPath);
        });
      }
      return chain;
    },
    lean: () => chain,
    exec: () => Promise.resolve(res),
    then: (resolve, reject) => Promise.resolve(res).then(resolve, reject),
    catch: (reject) => Promise.resolve(res).catch(reject),
  };
  return chain;
};

const createMockBatchDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    name: data.name,
    description: data.description || '',
    features: data.features || [],
    price: data.price !== undefined ? Number(data.price) : 49,
    currency: data.currency || '₹',
    status: data.status || 'active',
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    return { ...this };
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryBatches.set(String(this._id), this);
    return this;
  };
  doc.populate = function () {
    return this;
  };
  return doc;
};

const createMockPurchaseDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    user: data.user,
    batch: data.batch,
    orderId: data.orderId || `order_${Date.now()}`,
    paymentId: data.paymentId || null,
    amountPaid: Number(data.amountPaid),
    currency: data.currency || '₹',
    paymentStatus: data.paymentStatus || 'pending',
    paymentMethod: data.paymentMethod || 'GATEWAY_SANDBOX',
    paymentSignature: data.paymentSignature || null,
    transactionId: data.transactionId || null,
    verifiedAt: data.verifiedAt || null,
    purchasedAt: data.purchasedAt || new Date(),
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };

  doc.toJSON = function () {
    return { ...this };
  };

  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryPurchases.set(String(this._id), this);
    return this;
  };

  doc.populate = function (path) {
    if (path === 'batch' && inMemoryBatches) {
      const batchIdStr = String(this.batch?._id || this.batch);
      const foundBatch = inMemoryBatches.get(batchIdStr);
      if (foundBatch) {
        this.batch = createMockBatchDoc(foundBatch);
      }
    }
    if (path === 'user' && inMemoryUsers) {
      const userIdStr = String(this.user?._id || this.user);
      for (const u of inMemoryUsers.values()) {
        if (String(u._id) === userIdStr) {
          this.user = createMockUserDoc(u);
          break;
        }
      }
    }
    return this;
  };

  return doc;
};

const createMockUserDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    name: data.name,
    email: (data.email || '').toLowerCase().trim(),
    passwordHash: data.passwordHash,
    role: data.role || 'student',
    roadmap: data.roadmap || null,
    learningProgress: data.learningProgress || { topicsCompleted: 0, totalTopics: 0, percentage: 0, lastCompletedTopic: null, completedTopicsList: [] },
    streak: data.streak || { currentStreak: 0, longestStreak: 0, lastActiveDate: null, freezeDaysAvailable: 0 },
    skills: data.skills || [],
    testPerformance: data.testPerformance || { testsTaken: 0, averageScore: 0, highestScore: 0, lastTestDate: null, recentTests: [] },
    recentActivity: data.recentActivity || [],
    selectedLanguage: data.selectedLanguage || null,
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };

  doc.toJSON = function () {
    const copy = { ...this };
    delete copy.passwordHash;
    return copy;
  };

  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryUsers.set(this.email.toLowerCase(), this);
    if (this._id) inMemoryUsers.set(String(this._id), this);
    return this;
  };

  return doc;
};

const createMockLanguageDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    name: data.name,
    slug: data.slug,
    version: data.version || '1.0.0',
    fileExtension: data.fileExtension || '.txt',
    monacoMode: data.monacoMode || 'plaintext',
    defaultTemplate: data.defaultTemplate || '',
    description: data.description || '',
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    displayOrder: data.displayOrder || 0,
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    return { ...this };
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryLanguages.set(String(this._id), this);
    if (this.slug) inMemoryLanguages.set(this.slug, this);
    return this;
  };
  return doc;
};

const createMockTrackDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    name: data.name,
    slug: data.slug,
    description: data.description || '',
    category: data.category || 'Full-Stack Development',
    modules: data.modules || [],
    totalModules: data.modules?.length || 0,
    level: data.level || 'Beginner to Advanced',
    estimatedHours: data.estimatedHours || 120,
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    displayOrder: data.displayOrder || 1,
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    return { ...this };
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryTracks.set(String(this._id), this);
    if (this.slug) inMemoryTracks.set(this.slug, this);
    return this;
  };
  return doc;
};

const createMockTopicDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    title: data.title,
    description: data.description || '',
    track: data.track || null,
    language: data.language || null,
    difficulty: data.difficulty || 'Beginner',
    order: data.order !== undefined ? Number(data.order) : 1,
    status: data.status || 'published',
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    return { ...this };
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryTopics.set(String(this._id), this);
    return this;
  };
  doc.populate = function (path) {
    if (path === 'language' && this.language && inMemoryLanguages) {
      const langIdStr = String(this.language._id || this.language);
      const foundLang = inMemoryLanguages.get(langIdStr);
      if (foundLang) this.language = createMockLanguageDoc(foundLang);
    }
    if (path === 'track' && this.track && inMemoryTracks) {
      const trackIdStr = String(this.track._id || this.track);
      const foundTrack = inMemoryTracks.get(trackIdStr);
      if (foundTrack) this.track = createMockTrackDoc(foundTrack);
    }
    if (Array.isArray(path)) {
      path.forEach((p) => this.populate(p));
    }
    return this;
  };
  return doc;
};

const createMockLessonDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    title: data.title,
    content: data.content,
    topic: data.topic,
    difficulty: data.difficulty || 'Beginner',
    estimatedTime: data.estimatedTime ? Number(data.estimatedTime) : 10,
    order: Number(data.order || 1),
    status: data.status || 'published',
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    return { ...this };
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryLessons.set(String(this._id), this);
    return this;
  };
  doc.populate = function () {
    return this;
  };
  return doc;
};

const createMockQuestionDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    questionText: data.questionText,
    options: data.options || [],
    correctOptionIndex: data.correctOptionIndex !== undefined ? Number(data.correctOptionIndex) : 0,
    difficulty: data.difficulty || 'Beginner',
    track: data.track || null,
    language: data.language || null,
    status: data.status || 'published',
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    const copy = { ...this };
    delete copy.correctOptionIndex;
    return copy;
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryQuestions.set(String(this._id), this);
    return this;
  };
  doc.populate = function () {
    return this;
  };
  return doc;
};

const createMockDebugChallengeDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    title: data.title,
    description: data.description,
    bugType: data.bugType,
    difficulty: data.difficulty || 'Beginner',
    language: data.language,
    buggyCode: data.buggyCode,
    solutionCode: data.solutionCode,
    hints: data.hints || [],
    testCases: data.testCases || [],
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    status: data.status || 'published',
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    const copy = { ...this };
    delete copy.solutionCode;
    if (copy.testCases && Array.isArray(copy.testCases)) {
      copy.testCases = copy.testCases.map((tc) => {
        if (tc.isHidden) {
          const { input, expectedOutput, ...rest } = tc;
          return rest;
        }
        return tc;
      });
    }
    return copy;
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryDebugChallenges.set(String(this._id), this);
    return this;
  };
  doc.populate = function () {
    return this;
  };
  return doc;
};


const createMockDebugAttemptDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    student: data.student,
    challenge: data.challenge,
    submittedCode: data.submittedCode,
    status: data.status,
    score: data.score || 0,
    hintsUsed: data.hintsUsed || 0,
    hintPenalty: data.hintPenalty || 0,
    executionTimeMs: data.executionTimeMs || 0,
    feedback: data.feedback || '',
    testCaseResults: data.testCaseResults || [],
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    return { ...this };
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryDebugAttempts.set(String(this._id), this);
    return this;
  };
  return doc;
};

const createMockWeeklyTestDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    title: data.title,
    description: data.description,
    durationMinutes: Number(data.durationMinutes),
    questions: data.questions || [],
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    status: data.status || 'published',
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    return { ...this };
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryWeeklyTests.set(String(this._id), this);
    return this;
  };
  doc.populate = function () {
    return this;
  };
  return doc;
};

const createMockCompetitionDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    title: data.title,
    description: data.description,
    startTime: data.startTime ? new Date(data.startTime) : new Date(),
    endTime: data.endTime ? new Date(data.endTime) : new Date(),
    isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
    status: data.status || 'published',
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    return { ...this };
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryCompetitions.set(String(this._id), this);
    return this;
  };
  doc.populate = function () {
    return this;
  };
  return doc;
};

const createMockNotificationDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    user: data.user,
    type: data.type,
    title: data.title,
    message: data.message,
    data: data.data || {},
    isRead: Boolean(data.isRead),
    readAt: data.readAt || null,
    createdAt: data.createdAt || new Date(),
    updatedAt: new Date(),
  };
  doc.toJSON = function () {
    return { ...this };
  };
  doc.save = async function () {
    this.updatedAt = new Date();
    inMemoryNotifications.set(String(this._id), this);
    return this;
  };
  return doc;
};

export const setDevFallbackActive = (active) => {
  fallbackActive = active;
};

export const isDevFallbackActive = () => fallbackActive;

export const activateDevFallbackStore = async (
  UserParam,
  LanguageParam,
  TrackParam,
  TopicParam,
  LessonParam,
  AssessmentQuestionParam,
  DebugChallengeParam,
  WeeklyTestParam,
  CompetitionParam,
  BatchParam,
  PurchaseParam,
  NotificationParam
) => {
  fallbackActive = true;

  const allParams = [
    UserParam, LanguageParam, TrackParam, TopicParam, LessonParam,
    AssessmentQuestionParam, DebugChallengeParam, WeeklyTestParam,
    CompetitionParam, BatchParam, PurchaseParam, NotificationParam
  ].filter(Boolean);

  let User = mongoose.models.User;
  let Language = mongoose.models.Language;
  let Track = mongoose.models.Track;
  let Topic = mongoose.models.Topic;
  let Lesson = mongoose.models.Lesson;
  let AssessmentQuestion = mongoose.models.AssessmentQuestion;
  let DebugChallenge = mongoose.models.DebugChallenge;
  let WeeklyTest = mongoose.models.WeeklyTest;
  let Competition = mongoose.models.Competition;
  let Batch = mongoose.models.Batch;
  let Purchase = mongoose.models.Purchase;
  let Notification = mongoose.models.Notification;

  if (UserParam && typeof UserParam === 'object' && UserParam.User) {
    User = UserParam.User || User;
    Language = UserParam.Language || Language;
    Track = UserParam.Track || Track;
    Topic = UserParam.Topic || Topic;
    Lesson = UserParam.Lesson || Lesson;
    AssessmentQuestion = UserParam.AssessmentQuestion || AssessmentQuestion;
    DebugChallenge = UserParam.DebugChallenge || DebugChallenge;
    WeeklyTest = UserParam.WeeklyTest || WeeklyTest;
    Competition = UserParam.Competition || Competition;
    Batch = UserParam.Batch || Batch;
    Purchase = UserParam.Purchase || Purchase;
    Notification = UserParam.Notification || Notification;
  } else {
    allParams.forEach((arg) => {
      if (arg && arg.modelName) {
        if (arg.modelName === 'User') User = arg;
        else if (arg.modelName === 'Language') Language = arg;
        else if (arg.modelName === 'Track') Track = arg;
        else if (arg.modelName === 'Topic') Topic = arg;
        else if (arg.modelName === 'Lesson') Lesson = arg;
        else if (arg.modelName === 'AssessmentQuestion') AssessmentQuestion = arg;
        else if (arg.modelName === 'DebugChallenge') DebugChallenge = arg;
        else if (arg.modelName === 'WeeklyTest') WeeklyTest = arg;
        else if (arg.modelName === 'Competition') Competition = arg;
        else if (arg.modelName === 'Batch') Batch = arg;
        else if (arg.modelName === 'Purchase') Purchase = arg;
        else if (arg.modelName === 'Notification') Notification = arg;
      }
    });
  }

  if (User) User._fallbackPatched = true;
  if (Language) Language._fallbackPatched = true;
  if (Track) Track._fallbackPatched = true;
  if (Topic) Topic._fallbackPatched = true;
  if (Lesson) Lesson._fallbackPatched = true;
  if (AssessmentQuestion) AssessmentQuestion._fallbackPatched = true;
  if (DebugChallenge) DebugChallenge._fallbackPatched = true;
  if (WeeklyTest) WeeklyTest._fallbackPatched = true;
  if (Competition) Competition._fallbackPatched = true;
  if (Batch) Batch._fallbackPatched = true;
  if (Purchase) Purchase._fallbackPatched = true;
  if (Notification) Notification._fallbackPatched = true;

  logger.info('[DevFallbackStore] Initializing CodeForge In-Memory Data Store...');

  for (const chal of DEFAULT_DEBUG_CHALLENGES) {
    const doc = createMockDebugChallengeDoc(chal);
    inMemoryDebugChallenges.set(String(doc._id), doc);
  }

  // 1. Seed Languages
  for (const lang of DEFAULT_LANGUAGES) {
    const doc = createMockLanguageDoc(lang);
    inMemoryLanguages.set(String(doc._id), doc);
    inMemoryLanguages.set(doc.slug, doc);
  }

  // 2. Seed Default Accounts
  const adminHash = bcrypt.hashSync('Admin@123', 10);
  const studentHash = bcrypt.hashSync('Student@123', 10);
  const testStudentHash = bcrypt.hashSync('password123', 10);

  const defaultAdmin = createMockUserDoc({
    _id: new mongoose.Types.ObjectId('65f1a1a1a1a1a1a1a1a1a100'),
    name: 'CodeForge Administrator',
    email: 'admin@codeforge.dev',
    passwordHash: adminHash,
    role: 'admin',
  });
  inMemoryUsers.set('admin@codeforge.dev', defaultAdmin);
  inMemoryUsers.set(String(defaultAdmin._id), defaultAdmin);

  const defaultStudent = createMockUserDoc({
    _id: new mongoose.Types.ObjectId('65f1a1a1a1a1a1a1a1a1a101'),
    name: 'Alex Student',
    email: 'student@codeforge.dev',
    passwordHash: studentHash,
    role: 'student',
    selectedLanguage: null,
  });
  inMemoryUsers.set('student@codeforge.dev', defaultStudent);
  inMemoryUsers.set(String(defaultStudent._id), defaultStudent);

  const testStudent = createMockUserDoc({
    _id: new mongoose.Types.ObjectId('65f1a1a1a1a1a1a1a1a1a102'),
    name: 'Test Student',
    email: 'student@test.com',
    passwordHash: testStudentHash,
    role: 'student',
    selectedLanguage: null,
  });
  inMemoryUsers.set('student@test.com', testStudent);
  inMemoryUsers.set(String(testStudent._id), testStudent);

  // 3. User Model Patches
  const origUserFindOne = User.findOne;
  User.findOne = function (query, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origUserFindOne.call(User, query, ...args);
    if (query) {
      if (query.email) {
        const raw = typeof query.email === 'object' && query.email.$eq ? query.email.$eq : query.email;
        const targetEmail = String(raw).toLowerCase().trim();
        let user = inMemoryUsers.get(targetEmail);
        if (!user) {
          for (const u of inMemoryUsers.values()) {
            if (u && u.email && String(u.email).toLowerCase().trim() === targetEmail) {
              user = u;
              break;
            }
          }
        }
        return buildSingleChain(user ? createMockUserDoc(user) : null);
      }
      if (query._id) {
        const idStr = String(query._id);
        for (const u of inMemoryUsers.values()) {
          if (String(u._id) === idStr) return buildSingleChain(createMockUserDoc(u));
        }
      }
    }
    return buildSingleChain(null);
  };

  const origUserFindById = User.findById;
  User.findById = function (id, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origUserFindById.call(User, id, ...args);
    if (!id) return buildSingleChain(null);
    const idStr = String(id);
    for (const user of inMemoryUsers.values()) {
      if (String(user._id) === idStr) {
        const doc = createMockUserDoc(user);
        return buildSingleChain(doc);
      }
    }
    return buildSingleChain(null);
  };

  const origUserCreate = User.create;
  User.create = function (data, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origUserCreate.call(User, data, ...args);
    const doc = createMockUserDoc(data);
    inMemoryUsers.set(doc.email.toLowerCase(), doc);
    inMemoryUsers.set(String(doc._id), doc);
    return Promise.resolve(doc);
  };

  const origUserFind = User.find;
  User.find = function (query = {}, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origUserFind.call(User, query, ...args);
    let results = Array.from(inMemoryUsers.values()).map(createMockUserDoc);
    if (query.role) results = results.filter((u) => u.role === query.role);
    if (query.$or) {
      results = results.filter((u) =>
        query.$or.some((cond) => {
          if (cond.name) return cond.name.test(u.name);
          if (cond.email) return cond.email.test(u.email);
          return false;
        })
      );
    }
    return buildChain(results);
  };

  const origUserCount = User.countDocuments;
  User.countDocuments = function (query = {}, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origUserCount.call(User, query, ...args);
    let results = Array.from(inMemoryUsers.values());
    if (query.role) results = results.filter((u) => u.role === query.role);
    if (query.$or) {
      results = results.filter((u) =>
        query.$or.some((cond) => {
          if (cond.name) return cond.name.test(u.name);
          if (cond.email) return cond.email.test(u.email);
          return false;
        })
      );
    }
    return Promise.resolve(results.length);
  };

  const origUserFindByIdAndDelete = User.findByIdAndDelete;
  User.findByIdAndDelete = function (id, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origUserFindByIdAndDelete.call(User, id, ...args);
    if (!id) return buildSingleChain(null);
    const idStr = String(id);
    for (const [key, user] of inMemoryUsers.entries()) {
      if (String(user._id) === idStr) {
        inMemoryUsers.delete(key);
      }
    }
    return Promise.resolve({ _id: idStr });
  };

  // 4. Language Model Patches
  const origLanguageFind = Language.find;
  Language.find = function (query = {}, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origLanguageFind.call(Language, query, ...args);
    let results = Array.from(inMemoryLanguages.values()).map(createMockLanguageDoc);
    // Deduplicate by ID
    const uniqueMap = new Map();
    results.forEach((l) => uniqueMap.set(String(l._id), l));
    results = Array.from(uniqueMap.values());

    if (query.isActive !== undefined) results = results.filter((l) => l.isActive === query.isActive);
    if (query.$or) {
      results = results.filter((l) =>
        query.$or.some((cond) => {
          if (cond.name) return cond.name.test(l.name);
          if (cond.slug) return cond.slug.test(l.slug);
          return false;
        })
      );
    }
    return buildChain(results);
  };

  const origLanguageFindById = Language.findById;
  Language.findById = function (id, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origLanguageFindById.call(Language, id, ...args);
    if (!id) return buildSingleChain(null);
    const idStr = String(id);
    const found = inMemoryLanguages.get(idStr);
    return Promise.resolve(found ? createMockLanguageDoc(found) : null);
  };

  const origLanguageCreate = Language.create;
  Language.create = function (data, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origLanguageCreate.call(Language, data, ...args);
    const doc = createMockLanguageDoc(data);
    inMemoryLanguages.set(String(doc._id), doc);
    inMemoryLanguages.set(doc.slug, doc);
    return Promise.resolve(doc);
  };

  const origLanguageFindByIdAndDelete = Language.findByIdAndDelete;
  Language.findByIdAndDelete = function (id, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origLanguageFindByIdAndDelete.call(Language, id, ...args);
    if (!id) return buildSingleChain(null);
    const idStr = String(id);
    inMemoryLanguages.delete(idStr);
    return Promise.resolve({ _id: idStr });
  };

  const origLanguageFindOne = Language.findOne;
  Language.findOne = function (query, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origLanguageFindOne.call(Language, query, ...args);
    if (query && query.slug) {
      const slug = String(query.slug).toLowerCase().trim();
      const lang = inMemoryLanguages.get(slug);
      return Promise.resolve(lang ? createMockLanguageDoc(lang) : null);
    }
    return Promise.resolve(null);
  };

  const origLanguageCount = Language.countDocuments;
  Language.countDocuments = function (query = {}, ...args) {
    if (mongoose.connection.readyState === 1 && !fallbackActive) return origLanguageCount.call(Language, query, ...args);
    return Promise.resolve(inMemoryLanguages.size);
  };

  // 5. Track Model Patches
  if (Track) {
    for (const track of DEFAULT_TRACKS) {
      const doc = createMockTrackDoc(track);
      inMemoryTracks.set(String(doc._id), doc);
      inMemoryTracks.set(doc.slug, doc);
    }

    const origTrackFind = Track.find;
    Track.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTrackFind.call(Track, query, ...args);
      let results = Array.from(inMemoryTracks.values()).map(createMockTrackDoc);
      const uniqueMap = new Map();
      results.forEach((t) => uniqueMap.set(String(t._id), t));
      results = Array.from(uniqueMap.values());

      if (query.isActive !== undefined) results = results.filter((t) => t.isActive === query.isActive);
      if (query.$or) {
        results = results.filter((t) =>
          query.$or.some((cond) => {
            if (cond.name) return cond.name.test(t.name);
            if (cond.slug) return cond.slug.test(t.slug);
            if (cond.category) return cond.category.test(t.category);
            return false;
          })
        );
      }
      return buildChain(results);
    };

    const origTrackFindById = Track.findById;
    Track.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTrackFindById.call(Track, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const found = inMemoryTracks.get(idStr);
      return Promise.resolve(found ? createMockTrackDoc(found) : null);
    };

    const origTrackCreate = Track.create;
    Track.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTrackCreate.call(Track, data, ...args);
      const doc = createMockTrackDoc(data);
      inMemoryTracks.set(String(doc._id), doc);
      inMemoryTracks.set(doc.slug, doc);
      return Promise.resolve(doc);
    };

    const origTrackFindByIdAndDelete = Track.findByIdAndDelete;
    Track.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTrackFindByIdAndDelete.call(Track, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      inMemoryTracks.delete(idStr);
      return Promise.resolve({ _id: idStr });
    };

    const origTrackFindOne = Track.findOne;
    Track.findOne = function (query, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTrackFindOne.call(Track, query, ...args);
      if (query && query.slug) {
        const slug = String(query.slug).toLowerCase().trim();
        const tr = inMemoryTracks.get(slug);
        return Promise.resolve(tr ? createMockTrackDoc(tr) : null);
      }
      return Promise.resolve(null);
    };

    const origTrackCount = Track.countDocuments;
    Track.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTrackCount.call(Track, query, ...args);
      return Promise.resolve(inMemoryTracks.size);
    };
  }

  // 6. Topic Model Patches
  if (Topic) {
    const origTopicFind = Topic.find;
    Topic.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTopicFind.call(Topic, query, ...args);
      let results = Array.from(inMemoryTopics.values()).map(createMockTopicDoc);

      if (query.language) results = results.filter((t) => String(t.language) === String(query.language));
      if (query.track) results = results.filter((t) => String(t.track) === String(query.track));
      if (query.difficulty) results = results.filter((t) => t.difficulty === query.difficulty);
      if (query.status) results = results.filter((t) => t.status === query.status);

      if (query.$or) {
        results = results.filter((t) =>
          query.$or.some((cond) => {
            if (cond.title) return cond.title.test(t.title);
            if (cond.description) return cond.description.test(t.description);
            return false;
          })
        );
      }
      return buildChain(results);
    };

    const origTopicFindById = Topic.findById;
    Topic.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTopicFindById.call(Topic, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const found = inMemoryTopics.get(idStr);
      const doc = found ? createMockTopicDoc(found) : null;
      const singleChain = {
        populate: function (path) {
          if (doc) doc.populate(path);
          return singleChain;
        },
        exec: () => Promise.resolve(doc),
        then: (resolve, reject) => Promise.resolve(doc).then(resolve, reject),
      };
      return singleChain;
    };

    const origTopicCreate = Topic.create;
    Topic.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTopicCreate.call(Topic, data, ...args);
      const doc = createMockTopicDoc(data);
      inMemoryTopics.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    const origTopicCount = Topic.countDocuments;
    Topic.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTopicCount.call(Topic, query, ...args);
      return Promise.resolve(inMemoryTopics.size);
    };

    const origTopicFindByIdAndDelete = Topic.findByIdAndDelete;
    Topic.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origTopicFindByIdAndDelete.call(Topic, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      inMemoryTopics.delete(idStr);
      return Promise.resolve({ _id: idStr });
    };
  }

  // 7. Batch Model Patches
  if (Batch) {
    for (const batch of DEFAULT_BATCHES) {
      inMemoryBatches.set(String(batch._id), createMockBatchDoc(batch));
    }

    const origBatchFind = Batch.find;
    Batch.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origBatchFind.call(Batch, query, ...args);
      let results = Array.from(inMemoryBatches.values()).map(createMockBatchDoc);
      if (query.status) results = results.filter((b) => b.status === query.status);
      return buildChain(results);
    };

    const origBatchFindById = Batch.findById;
    Batch.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origBatchFindById.call(Batch, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const b = inMemoryBatches.get(idStr);
      return buildSingleChain(b ? createMockBatchDoc(b) : null);
    };

    const origBatchCount = Batch.countDocuments;
    Batch.countDocuments = function (...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origBatchCount.call(Batch, ...args);
      return Promise.resolve(inMemoryBatches.size);
    };

    const origBatchCreate = Batch.create;
    Batch.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origBatchCreate.call(Batch, data, ...args);
      const doc = createMockBatchDoc(data);
      inMemoryBatches.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    const origBatchFindByIdAndUpdate = Batch.findByIdAndUpdate;
    Batch.findByIdAndUpdate = function (id, update, options, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origBatchFindByIdAndUpdate.call(Batch, id, update, options, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      let b = inMemoryBatches.get(idStr);
      if (b) {
        Object.assign(b, update, { updatedAt: new Date() });
        inMemoryBatches.set(idStr, b);
      }
      return buildSingleChain(b ? createMockBatchDoc(b) : null);
    };

    const origBatchFindByIdAndDelete = Batch.findByIdAndDelete;
    Batch.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origBatchFindByIdAndDelete.call(Batch, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const b = inMemoryBatches.get(idStr);
      inMemoryBatches.delete(idStr);
      return Promise.resolve(b ? createMockBatchDoc(b) : null);
    };
  }

  // 8. Purchase Model Patches
  if (Purchase) {
    const origPurchaseFind = Purchase.find;
    Purchase.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origPurchaseFind.call(Purchase, query, ...args);
      let results = Array.from(inMemoryPurchases.values()).map(createMockPurchaseDoc);
      if (query.user) {
        const userIdStr = String(query.user._id || query.user);
        results = results.filter((p) => String(p.user._id || p.user) === userIdStr);
      }
      if (query.paymentStatus) {
        results = results.filter((p) => p.paymentStatus === query.paymentStatus);
      }
      return buildChain(results);
    };

    const origPurchaseFindOne = Purchase.findOne;
    Purchase.findOne = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origPurchaseFindOne.call(Purchase, query, ...args);
      let results = Array.from(inMemoryPurchases.values()).map(createMockPurchaseDoc);
      let found = null;
      if (query.orderId) {
        found = results.find((p) => p.orderId === query.orderId);
      } else if (query.user && query.batch) {
        const userIdStr = String(query.user._id || query.user);
        const batchIdStr = String(query.batch._id || query.batch);
        found = results.find((p) => {
          const matchUser = String(p.user._id || p.user) === userIdStr;
          const matchBatch = String(p.batch._id || p.batch) === batchIdStr;
          const matchStatus = query.paymentStatus ? p.paymentStatus === query.paymentStatus : true;
          return matchUser && matchBatch && matchStatus;
        });
      } else if (query.user) {
        const userIdStr = String(query.user._id || query.user);
        found = results.find((p) => String(p.user._id || p.user) === userIdStr);
      }
      return buildSingleChain(found);
    };

    const origPurchaseFindById = Purchase.findById;
    Purchase.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origPurchaseFindById.call(Purchase, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const p = inMemoryPurchases.get(idStr);
      const doc = p ? createMockPurchaseDoc(p) : null;
      return buildSingleChain(doc);
    };

    const origPurchaseCreate = Purchase.create;
    Purchase.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origPurchaseCreate.call(Purchase, data, ...args);
      const doc = createMockPurchaseDoc(data);
      inMemoryPurchases.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    const origPurchaseCount = Purchase.countDocuments;
    Purchase.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origPurchaseCount.call(Purchase, query, ...args);
      let results = Array.from(inMemoryPurchases.values());
      if (query.paymentStatus) {
        results = results.filter((p) => p.paymentStatus === query.paymentStatus);
      }
      return Promise.resolve(results.length);
    };
  }

  // 9. Lesson Model Patches
  if (Lesson) {
    const origLessonFind = Lesson.find;
    Lesson.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origLessonFind.call(Lesson, query, ...args);
      let results = Array.from(inMemoryLessons.values()).map(createMockLessonDoc);
      if (query.status) results = results.filter((l) => l.status === query.status);
      if (query.topic) results = results.filter((l) => String(l.topic?._id || l.topic) === String(query.topic?._id || query.topic));
      return buildChain(results);
    };

    const origLessonFindOne = Lesson.findOne;
    Lesson.findOne = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origLessonFindOne.call(Lesson, query, ...args);
      let results = Array.from(inMemoryLessons.values()).map(createMockLessonDoc);
      if (query._id) results = results.filter((l) => String(l._id) === String(query._id));
      if (query.status) results = results.filter((l) => l.status === query.status);
      if (query.topic) results = results.filter((l) => String(l.topic?._id || l.topic) === String(query.topic?._id || query.topic));
      return buildSingleChain(results[0] || null);
    };

    const origLessonFindById = Lesson.findById;
    Lesson.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origLessonFindById.call(Lesson, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const found = inMemoryLessons.get(idStr);
      const doc = found ? createMockLessonDoc(found) : null;
      return buildSingleChain(doc);
    };

    const origLessonCreate = Lesson.create;
    Lesson.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origLessonCreate.call(Lesson, data, ...args);
      const doc = createMockLessonDoc(data);
      inMemoryLessons.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    const origLessonCount = Lesson.countDocuments;
    Lesson.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origLessonCount.call(Lesson, query, ...args);
      return Promise.resolve(inMemoryLessons.size);
    };

    const origLessonFindByIdAndDelete = Lesson.findByIdAndDelete;
    Lesson.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origLessonFindByIdAndDelete.call(Lesson, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      inMemoryLessons.delete(idStr);
      return Promise.resolve({ _id: idStr });
    };
  }

  // 10. Question Model Patches
  if (AssessmentQuestion) {
    const origQFind = AssessmentQuestion.find;
    AssessmentQuestion.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origQFind.call(AssessmentQuestion, query, ...args);
      let results = Array.from(inMemoryQuestions.values()).map(createMockQuestionDoc);
      if (query.status) results = results.filter((q) => q.status === query.status);
      if (query.language) results = results.filter((q) => String(q.language?._id || q.language) === String(query.language?._id || query.language));
      return buildChain(results);
    };

    const origQFindOne = AssessmentQuestion.findOne;
    AssessmentQuestion.findOne = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origQFindOne.call(AssessmentQuestion, query, ...args);
      let results = Array.from(inMemoryQuestions.values()).map(createMockQuestionDoc);
      if (query._id) results = results.filter((q) => String(q._id) === String(query._id));
      if (query.status) results = results.filter((q) => q.status === query.status);
      return buildSingleChain(results[0] || null);
    };

    const origQFindById = AssessmentQuestion.findById;
    AssessmentQuestion.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origQFindById.call(AssessmentQuestion, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const found = inMemoryQuestions.get(idStr);
      const doc = found ? createMockQuestionDoc(found) : null;
      const chain = {
        populate: function () {
          return chain;
        },
        exec: () => Promise.resolve(doc),
        then: (resolve, reject) => Promise.resolve(doc).then(resolve, reject),
      };
      return chain;
    };

    const origQCreate = AssessmentQuestion.create;
    AssessmentQuestion.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origQCreate.call(AssessmentQuestion, data, ...args);
      const doc = createMockQuestionDoc(data);
      inMemoryQuestions.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    const origQCount = AssessmentQuestion.countDocuments;
    AssessmentQuestion.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origQCount.call(AssessmentQuestion, query, ...args);
      return Promise.resolve(inMemoryQuestions.size);
    };

    const origQFindByIdAndDelete = AssessmentQuestion.findByIdAndDelete;
    AssessmentQuestion.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origQFindByIdAndDelete.call(AssessmentQuestion, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      inMemoryQuestions.delete(idStr);
      return Promise.resolve({ _id: idStr });
    };
  }

  // 11. DebugChallenge Model Patches
  if (DebugChallenge) {
    const origDCFind = DebugChallenge.find;
    DebugChallenge.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origDCFind.call(DebugChallenge, query, ...args);
      let results = Array.from(inMemoryDebugChallenges.values()).map(createMockDebugChallengeDoc);
      if (query.status) results = results.filter((d) => d.status === query.status);
      if (query.language && query.language !== 'All') results = results.filter((d) => String(d.language).toLowerCase() === String(query.language).toLowerCase());
      if (query.difficulty && query.difficulty !== 'All') results = results.filter((d) => String(d.difficulty).toLowerCase() === String(query.difficulty).toLowerCase());
      if (query.isActive !== undefined) results = results.filter((d) => d.isActive === query.isActive);
      return buildChain(results);
    };

    const origDCFindById = DebugChallenge.findById;
    DebugChallenge.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origDCFindById.call(DebugChallenge, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const found = inMemoryDebugChallenges.get(idStr);
      const doc = found ? createMockDebugChallengeDoc(found) : null;
      const chain = {
        exec: () => Promise.resolve(doc),
        then: (resolve, reject) => Promise.resolve(doc).then(resolve, reject),
      };
      return chain;
    };

    const origDCCreate = DebugChallenge.create;
    DebugChallenge.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origDCCreate.call(DebugChallenge, data, ...args);
      const doc = createMockDebugChallengeDoc(data);
      inMemoryDebugChallenges.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    const origDCCount = DebugChallenge.countDocuments;
    DebugChallenge.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origDCCount.call(DebugChallenge, query, ...args);
      return Promise.resolve(inMemoryDebugChallenges.size);
    };

    const origDCFindByIdAndDelete = DebugChallenge.findByIdAndDelete;
    DebugChallenge.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origDCFindByIdAndDelete.call(DebugChallenge, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      inMemoryDebugChallenges.delete(idStr);
      return Promise.resolve({ _id: idStr });
    };
  }

  
  let DebugAttempt = mongoose.models.DebugAttempt || (UserParam && UserParam.DebugAttempt);
  if (DebugAttempt) {
    DebugAttempt._fallbackPatched = true;
    const origDAFind = DebugAttempt.find;
    DebugAttempt.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origDAFind.call(DebugAttempt, query, ...args);
      let results = Array.from(inMemoryDebugAttempts.values()).map(createMockDebugAttemptDoc);
      if (query.student) {
        const studentIdStr = String(query.student._id || query.student);
        results = results.filter(a => String(a.student._id || a.student) === studentIdStr);
      }
      if (query.challenge) {
        const challengeIdStr = String(query.challenge._id || query.challenge);
        results = results.filter(a => String(a.challenge._id || a.challenge) === challengeIdStr);
      }
      if (query.status) {
        results = results.filter(a => a.status === query.status);
      }
      return buildChain(results);
    };

    const origDAFindOne = DebugAttempt.findOne;
    DebugAttempt.findOne = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origDAFindOne.call(DebugAttempt, query, ...args);
      let results = Array.from(inMemoryDebugAttempts.values()).map(createMockDebugAttemptDoc);
      if (query.student) {
        const studentIdStr = String(query.student._id || query.student);
        results = results.filter(a => String(a.student._id || a.student) === studentIdStr);
      }
      if (query.challenge) {
        const challengeIdStr = String(query.challenge._id || query.challenge);
        results = results.filter(a => String(a.challenge._id || a.challenge) === challengeIdStr);
      }
      if (query.status) {
        results = results.filter(a => a.status === query.status);
      }
      return buildSingleChain(results[0] || null);
    };

    const origDACreate = DebugAttempt.create;
    DebugAttempt.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origDACreate.call(DebugAttempt, data, ...args);
      const doc = createMockDebugAttemptDoc(data);
      inMemoryDebugAttempts.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };
  }

  // 12. WeeklyTest Model Patches
  if (WeeklyTest) {
    const origWTFind = WeeklyTest.find;
    WeeklyTest.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origWTFind.call(WeeklyTest, query, ...args);
      let results = Array.from(inMemoryWeeklyTests.values()).map(createMockWeeklyTestDoc);
      if (query.status) results = results.filter((w) => w.status === query.status);
      return buildChain(results);
    };

    const origWTFindById = WeeklyTest.findById;
    WeeklyTest.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origWTFindById.call(WeeklyTest, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const found = inMemoryWeeklyTests.get(idStr);
      const doc = found ? createMockWeeklyTestDoc(found) : null;
      const chain = {
        populate: function () {
          return chain;
        },
        exec: () => Promise.resolve(doc),
        then: (resolve, reject) => Promise.resolve(doc).then(resolve, reject),
      };
      return chain;
    };

    const origWTCreate = WeeklyTest.create;
    WeeklyTest.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origWTCreate.call(WeeklyTest, data, ...args);
      const doc = createMockWeeklyTestDoc(data);
      inMemoryWeeklyTests.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    const origWTCount = WeeklyTest.countDocuments;
    WeeklyTest.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origWTCount.call(WeeklyTest, query, ...args);
      return Promise.resolve(inMemoryWeeklyTests.size);
    };

    const origWTFindByIdAndDelete = WeeklyTest.findByIdAndDelete;
    WeeklyTest.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origWTFindByIdAndDelete.call(WeeklyTest, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      inMemoryWeeklyTests.delete(idStr);
      return Promise.resolve({ _id: idStr });
    };
  }

  // 13. Competition Model Patches
  if (Competition) {
    const origCompFind = Competition.find;
    Competition.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origCompFind.call(Competition, query, ...args);
      let results = Array.from(inMemoryCompetitions.values()).map(createMockCompetitionDoc);
      if (query.status) results = results.filter((c) => c.status === query.status);
      return buildChain(results);
    };

    const origCompFindById = Competition.findById;
    Competition.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origCompFindById.call(Competition, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const found = inMemoryCompetitions.get(idStr);
      const doc = found ? createMockCompetitionDoc(found) : null;
      const chain = {
        exec: () => Promise.resolve(doc),
        then: (resolve, reject) => Promise.resolve(doc).then(resolve, reject),
      };
      return chain;
    };

    const origCompCreate = Competition.create;
    Competition.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origCompCreate.call(Competition, data, ...args);
      const doc = createMockCompetitionDoc(data);
      inMemoryCompetitions.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    const origCompCount = Competition.countDocuments;
    Competition.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origCompCount.call(Competition, query, ...args);
      return Promise.resolve(inMemoryCompetitions.size);
    };

    const origCompFindByIdAndDelete = Competition.findByIdAndDelete;
    Competition.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origCompFindByIdAndDelete.call(Competition, id, ...args);
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      inMemoryCompetitions.delete(idStr);
      return Promise.resolve({ _id: idStr });
    };
  }

  // 12. Notification Model Patches
  if (Notification) {
    const origNotifFind = Notification.find;
    Notification.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origNotifFind.call(Notification, query, ...args);
      let results = Array.from(inMemoryNotifications.values()).map(createMockNotificationDoc);
      if (query.user) {
        const userIdStr = String(query.user._id || query.user);
        results = results.filter((n) => String(n.user._id || n.user) === userIdStr);
      }
      if (query.isRead !== undefined && query.isRead !== null) {
        results = results.filter((n) => n.isRead === Boolean(query.isRead));
      }
      if (query.type) {
        results = results.filter((n) => n.type === query.type);
      }
      return buildChain(results);
    };

    const origNotifFindOne = Notification.findOne;
    Notification.findOne = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origNotifFindOne.call(Notification, query, ...args);
      let results = Array.from(inMemoryNotifications.values()).map(createMockNotificationDoc);
      const getIdStr = (val) => (val ? (val._id ? String(val._id) : String(val)) : '');

      if (query._id && query.user) {
        const idStr = getIdStr(query._id);
        const userIdStr = getIdStr(query.user);
        const found = results.find((n) => getIdStr(n._id) === idStr && getIdStr(n.user) === userIdStr);
        return Promise.resolve(found || null);
      }
      if (query._id) {
        const idStr = getIdStr(query._id);
        const found = results.find((n) => getIdStr(n._id) === idStr);
        return Promise.resolve(found || null);
      }
      return Promise.resolve(results[0] || null);
    };

    const origNotifFindOneAndDelete = Notification.findOneAndDelete;
    Notification.findOneAndDelete = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origNotifFindOneAndDelete.call(Notification, query, ...args);
      let results = Array.from(inMemoryNotifications.values());
      const getIdStr = (val) => (val ? (val._id ? String(val._id) : String(val)) : '');

      if (query._id && query.user) {
        const idStr = getIdStr(query._id);
        const userIdStr = getIdStr(query.user);
        const idx = results.findIndex((n) => getIdStr(n._id) === idStr && getIdStr(n.user) === userIdStr);
        if (idx !== -1) {
          const removed = results[idx];
          inMemoryNotifications.delete(String(removed._id));
          return Promise.resolve(createMockNotificationDoc(removed));
        }
      }
      if (query._id) {
        const idStr = getIdStr(query._id);
        const idx = results.findIndex((n) => getIdStr(n._id) === idStr);
        if (idx !== -1) {
          const removed = results[idx];
          inMemoryNotifications.delete(String(removed._id));
          return Promise.resolve(createMockNotificationDoc(removed));
        }
      }
      return Promise.resolve(null);
    };

    const origNotifCount = Notification.countDocuments;
    Notification.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origNotifCount.call(Notification, query, ...args);
      let results = Array.from(inMemoryNotifications.values());
      if (query.user) {
        const userIdStr = String(query.user._id || query.user);
        results = results.filter((n) => String(n.user._id || n.user) === userIdStr);
      }
      if (query.isRead !== undefined && query.isRead !== null) {
        results = results.filter((n) => n.isRead === Boolean(query.isRead));
      }
      if (query.type) {
        results = results.filter((n) => n.type === query.type);
      }
      return Promise.resolve(results.length);
    };

    const origNotifUpdateMany = Notification.updateMany;
    Notification.updateMany = function (query = {}, update = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origNotifUpdateMany.call(Notification, query, update, ...args);
      let count = 0;
      const now = new Date();
      for (const [id, notif] of inMemoryNotifications.entries()) {
        const matchUser = query.user ? String(notif.user._id || notif.user) === String(query.user._id || query.user) : true;
        const matchRead = query.isRead !== undefined ? notif.isRead === Boolean(query.isRead) : true;
        if (matchUser && matchRead) {
          if (update.$set) {
            if (update.$set.isRead !== undefined) notif.isRead = update.$set.isRead;
            if (update.$set.readAt !== undefined) notif.readAt = update.$set.readAt || now;
          }
          inMemoryNotifications.set(id, notif);
          count++;
        }
      }
      return Promise.resolve({ modifiedCount: count, nModified: count });
    };

    const origNotifCreate = Notification.create;
    Notification.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origNotifCreate.call(Notification, data, ...args);
      const doc = createMockNotificationDoc(data);
      inMemoryNotifications.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    if (Notification.prototype) {
      const origNotifProtoSave = Notification.prototype.save;
      Notification.prototype.save = function (...args) {
        if (mongoose.connection.readyState === 1 && !fallbackActive) return origNotifProtoSave.apply(this, args);
        const doc = createMockNotificationDoc(this);
        inMemoryNotifications.set(String(doc._id), doc);
        return Promise.resolve(doc);
      };
    }
  }

  // 13. Generic Model Patching for any remaining/unpatched Mongoose models
  const genericStores = new Map();
  const getGenericStore = (modelName) => {
    if (!genericStores.has(modelName)) {
      genericStores.set(modelName, new Map());
    }
    return genericStores.get(modelName);
  };

  const patchModelFallback = (Model) => {
    if (!Model || Model._fallbackPatched) return;
    Model._fallbackPatched = true;

    const modelName = Model.modelName || Model.name || 'Generic';
    const store = getGenericStore(modelName);

    const buildGenericChain = (res = []) => {
      let list = Array.from(res || []);
      const chain = {
        select: () => chain,
        sort: (sortObj) => {
          if (sortObj && typeof sortObj === 'object') {
            const key = Object.keys(sortObj)[0];
            const dir = sortObj[key] === -1 ? -1 : 1;
            list.sort((a, b) => {
              if (a[key] < b[key]) return -1 * dir;
              if (a[key] > b[key]) return 1 * dir;
              return 0;
            });
          }
          return chain;
        },
        skip: (n) => {
          list = list.slice(Math.max(0, parseInt(n, 10) || 0));
          return chain;
        },
        limit: (n) => {
          list = list.slice(0, Math.max(0, parseInt(n, 10) || 0));
          return chain;
        },
        populate: () => chain,
        lean: () => chain,
        exec: () => Promise.resolve(list),
        then: (resolve, reject) => Promise.resolve(list).then(resolve, reject),
      };
      return chain;
    };

    const buildSingleChain = (res = null) => {
      const chain = {
        select: () => chain,
        sort: () => chain,
        populate: () => chain,
        lean: () => chain,
        exec: () => Promise.resolve(res),
        then: (resolve, reject) => Promise.resolve(res).then(resolve, reject),
      };
      return chain;
    };

    const filterStore = (query = {}) => {
      let results = Array.from(store.values());
      if (!query || typeof query !== 'object') return results;
      const keys = Object.keys(query).filter(k => !k.startsWith('$'));
      if (keys.length === 0) return results;

      return results.filter(item => {
        return keys.every(k => {
          if (query[k] === undefined || query[k] === null) return true;
          const val = item[k];
          const target = query[k];
          if (val === undefined || val === null) return false;

          const valStr = String(val._id || val);
          const targetStr = String(target._id || target);
          return valStr === targetStr;
        });
      });
    };

    const getSchemaDefaults = () => {
      const defaults = {};
      if (Model.schema && Model.schema.paths) {
        for (const [path, schemaType] of Object.entries(Model.schema.paths)) {
          if (schemaType.defaultValue !== undefined && typeof schemaType.defaultValue !== 'function') {
            defaults[path] = schemaType.defaultValue;
          } else if (typeof schemaType.defaultValue === 'function') {
            try { defaults[path] = schemaType.defaultValue(); } catch (e) {}
          }
        }
      }
      return defaults;
    };

    const origFind = Model.find;
    Model.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origFind.call(Model, query, ...args);
      return buildGenericChain(filterStore(query));
    };

    const origFindOne = Model.findOne;
    Model.findOne = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origFindOne.call(Model, query, ...args);
      const matched = filterStore(query);
      return buildSingleChain(matched[0] || null);
    };

    const origFindById = Model.findById;
    Model.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origFindById.call(Model, id, ...args);
      const doc = store.get(String(id));
      return buildSingleChain(doc || null);
    };

    const origCreate = Model.create;
    Model.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origCreate.call(Model, data, ...args);
      const itemData = Array.isArray(data) ? data[0] : data;
      const id = itemData._id || new mongoose.Types.ObjectId();
      if (!id) return buildSingleChain(null);
    const idStr = String(id);
      const defaults = getSchemaDefaults();
      const doc = {
        _id: id,
        id: idStr,
        ...defaults,
        ...itemData,
        createdAt: itemData.createdAt || new Date(),
        updatedAt: new Date(),
        save: function () {
          this.updatedAt = new Date();
          store.set(String(this._id), this);
          return Promise.resolve(this);
        },
        toObject: function () {
          return { ...this };
        },
        toJSON: function () {
          if (Model.schema && Model.schema.methods && typeof Model.schema.methods.toJSON === 'function') {
            return Model.schema.methods.toJSON.call(this);
          }
          const copy = { ...this };
          delete copy.passwordHash;
          return copy;
        },
      };
      store.set(idStr, doc);
      return Promise.resolve(doc);
    };

    if (Model.prototype) {
      const origProtoSave = Model.prototype.save;
      Model.prototype.save = function (...args) {
        if (mongoose.connection.readyState === 1 && !fallbackActive) return origProtoSave.apply(this, args);
        const id = this._id || new mongoose.Types.ObjectId();
        this._id = id;
        this.id = String(id);
        this.updatedAt = new Date();
        const plainDoc = typeof this.toObject === 'function' ? this.toObject() : { ...this };
        plainDoc._id = id;
        plainDoc.id = String(id);
        plainDoc.save = function () {
          this.updatedAt = new Date();
          store.set(String(this._id), this);
          return Promise.resolve(this);
        };
        plainDoc.toJSON = function () {
          if (Model.schema && Model.schema.methods && typeof Model.schema.methods.toJSON === 'function') {
            return Model.schema.methods.toJSON.call(this);
          }
          const copy = { ...this };
          delete copy.passwordHash;
          return copy;
        };
        store.set(String(id), plainDoc);
        return Promise.resolve(plainDoc);
      };
    }

    const origCount = Model.countDocuments;
    Model.countDocuments = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origCount.call(Model, query, ...args);
      return Promise.resolve(filterStore(query).length);
    };

    const origAggregate = Model.aggregate;
    Model.aggregate = function (pipeline, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origAggregate.call(Model, pipeline, ...args);
      return Promise.resolve([]);
    };

    const origUpdateOne = Model.updateOne;
    Model.updateOne = function (query = {}, update = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origUpdateOne.call(Model, query, update, ...args);
      const matched = filterStore(query);
      if (matched.length > 0) {
        const doc = matched[0];
        if (update.$set) Object.assign(doc, update.$set);
        else Object.assign(doc, update);
        store.set(String(doc._id), doc);
        return Promise.resolve({ matchedCount: 1, modifiedCount: 1 });
      }
      return Promise.resolve({ matchedCount: 0, modifiedCount: 0 });
    };

    const origUpdateMany = Model.updateMany;
    Model.updateMany = function (query = {}, update = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origUpdateMany.call(Model, query, update, ...args);
      const matched = filterStore(query);
      matched.forEach(doc => {
        if (update.$set) Object.assign(doc, update.$set);
        else Object.assign(doc, update);
        store.set(String(doc._id), doc);
      });
      return Promise.resolve({ matchedCount: matched.length, modifiedCount: matched.length });
    };

    const origFindByIdAndUpdate = Model.findByIdAndUpdate;
    Model.findByIdAndUpdate = function (id, update = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origFindByIdAndUpdate.call(Model, id, update, ...args);
      const doc = store.get(String(id));
      if (doc) {
        if (update.$set) Object.assign(doc, update.$set);
        else Object.assign(doc, update);
        doc.updatedAt = new Date();
        store.set(String(id), doc);
      }
      return buildSingleChain(doc || null);
    };

    const origFindOneAndUpdate = Model.findOneAndUpdate;
    Model.findOneAndUpdate = function (query = {}, update = {}, opts = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origFindOneAndUpdate.call(Model, query, update, opts, ...args);
      const matched = filterStore(query);
      let doc = matched[0] || null;
      if (!doc && opts && opts.upsert) {
        const id = new mongoose.Types.ObjectId();
        doc = {
          _id: id,
          id: String(id),
          ...query,
          ...(update.$setOnInsert || {}),
          ...(update.$set || {}),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        store.set(String(id), doc);
      } else if (doc) {
        if (update.$set) Object.assign(doc, update.$set);
        else if (update.$inc) {
          for (const key of Object.keys(update.$inc)) {
            doc[key] = (doc[key] || 0) + update.$inc[key];
          }
        }
        doc.updatedAt = new Date();
        store.set(String(doc._id), doc);
      }
      return buildSingleChain(doc || null);
    };

    const origFindByIdAndDelete = Model.findByIdAndDelete;
    Model.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origFindByIdAndDelete.call(Model, id, ...args);
      const doc = store.get(String(id));
      if (doc) store.delete(String(id));
      return Promise.resolve(doc || { _id: id });
    };

    const origFindOneAndDelete = Model.findOneAndDelete;
    Model.findOneAndDelete = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origFindOneAndDelete.call(Model, query, ...args);
      const matched = filterStore(query);
      if (matched[0]) {
        store.delete(String(matched[0]._id));
        return Promise.resolve(matched[0]);
      }
      return Promise.resolve(null);
    };

    const origDeleteMany = Model.deleteMany;
    Model.deleteMany = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1 && !fallbackActive) return origDeleteMany.call(Model, query, ...args);
      const matched = filterStore(query);
      matched.forEach(doc => store.delete(String(doc._id)));
      return Promise.resolve({ deletedCount: matched.length });
    };
  };

  // Apply generic patch to all exported models in allModels and mongoose.models
  for (const key of Object.keys(allModels)) {
    if (allModels[key] && (allModels[key].modelName || allModels[key].name)) {
      patchModelFallback(allModels[key]);
    }
  }

  for (const modelName of Object.keys(mongoose.models)) {
    patchModelFallback(mongoose.models[modelName]);
  }

  logger.info('[DevFallbackStore] In-Memory Data Store active with default accounts:');
  logger.info('  -> Student: student@codeforge.dev / Student@123');
  logger.info('  -> Admin:   admin@codeforge.dev   / Admin@123');
};
