import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { DEFAULT_LANGUAGES } from '../services/languageService.js';
import { DEFAULT_TRACKS } from '../services/trackService.js';
import { DEFAULT_BATCHES } from '../services/batchService.js';
import { logger } from '../utils/logger.js';

let fallbackActive = false;
const inMemoryUsers = new Map();
const inMemoryLanguages = new Map();
const inMemoryTracks = new Map();
const inMemoryBatches = new Map();

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
  return doc;
};


// Helper to create safe user object with toJSON and save
const createMockUserDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    name: data.name,
    email: (data.email || '').toLowerCase().trim(),
    passwordHash: data.passwordHash,
    role: data.role || 'student',
    roadmap: data.roadmap || null,
    learningProgress: data.learningProgress || { topicsCompleted: 0, totalTopics: 0, percentage: 0, lastCompletedTopic: null },
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
    return this;
  };

  return doc;
};

// Helper to create mock language doc
const createMockLanguageDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    ...data,
  };
  doc.toJSON = function () {
    return { ...this };
  };
  return doc;
};

// Helper to create mock track doc
const createMockTrackDoc = (data) => {
  const doc = {
    _id: data._id || new mongoose.Types.ObjectId(),
    totalModules: data.modules?.length || 0,
    ...data,
  };
  doc.toJSON = function () {
    return { ...this };
  };
  return doc;
};

export const isDevFallbackActive = () => fallbackActive;

/**
 * Initializes and patches Mongoose models to fall back seamlessly
 * to an in-memory data store when local MongoDB is unavailable.
 */
export const activateDevFallbackStore = async (User, Language, Track, Batch) => {
  if (fallbackActive) return;
  fallbackActive = true;

  logger.info('[DevFallbackStore] Initializing CodeForge In-Memory Data Store...');

  // 1. Seed Languages
  for (const lang of DEFAULT_LANGUAGES) {
    inMemoryLanguages.set(lang.slug, createMockLanguageDoc(lang));
  }

  // 2. Seed Default Accounts
  const adminHash = await bcrypt.hash('Admin@123', 10);
  const studentHash = await bcrypt.hash('Student@123', 10);

  const defaultAdmin = createMockUserDoc({
    name: 'CodeForge Administrator',
    email: 'admin@codeforge.dev',
    passwordHash: adminHash,
    role: 'admin',
  });
  inMemoryUsers.set('admin@codeforge.dev', defaultAdmin);

  const defaultStudent = createMockUserDoc({
    name: 'Alex Student',
    email: 'student@codeforge.dev',
    passwordHash: studentHash,
    role: 'student',
    selectedLanguage: null,
  });
  inMemoryUsers.set('student@codeforge.dev', defaultStudent);

  // 3. Patch User model methods to fallback when Mongoose is not connected (readyState !== 1)
  const origUserFindOne = User.findOne;
  User.findOne = function (query, ...args) {
    if (mongoose.connection.readyState === 1) {
      return origUserFindOne.call(User, query, ...args);
    }

    if (query && query.email) {
      const email = String(query.email).toLowerCase().trim();
      const user = inMemoryUsers.get(email);
      return Promise.resolve(user ? createMockUserDoc(user) : null);
    }
    return Promise.resolve(null);
  };

  const origUserFindById = User.findById;
  User.findById = function (id, ...args) {
    if (mongoose.connection.readyState === 1) {
      return origUserFindById.call(User, id, ...args);
    }

    const idStr = String(id);
    for (const user of inMemoryUsers.values()) {
      if (String(user._id) === idStr) {
        return Promise.resolve(createMockUserDoc(user));
      }
    }
    return Promise.resolve(null);
  };

  const origUserCreate = User.create;
  User.create = function (data, ...args) {
    if (mongoose.connection.readyState === 1) {
      return origUserCreate.call(User, data, ...args);
    }

    const doc = createMockUserDoc(data);
    inMemoryUsers.set(doc.email.toLowerCase(), doc);
    return Promise.resolve(doc);
  };

  const origUserFind = User.find;
  User.find = function (query = {}, ...args) {
    if (mongoose.connection.readyState === 1) {
      return origUserFind.call(User, query, ...args);
    }

    let results = Array.from(inMemoryUsers.values()).map(createMockUserDoc);
    if (query.role) {
      results = results.filter((u) => u.role === query.role);
    }
    return Promise.resolve(results);
  };

  // 4. Patch Language model methods
  const origLanguageFind = Language.find;
  Language.find = function (query = {}, ...args) {
    if (mongoose.connection.readyState === 1) {
      return origLanguageFind.call(Language, query, ...args);
    }

    let results = Array.from(inMemoryLanguages.values()).map(createMockLanguageDoc);
    if (query.isActive !== undefined) {
      results = results.filter((l) => l.isActive === query.isActive);
    }
    results.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

    // Support chainable .sort(), .lean(), .exec(), and thenable promise
    const chain = {
      sort: () => chain,
      lean: () => chain,
      exec: () => Promise.resolve(results),
      then: (resolve, reject) => Promise.resolve(results).then(resolve, reject),
      catch: (reject) => Promise.resolve(results).catch(reject),
    };
    return chain;
  };

  const origLanguageFindOne = Language.findOne;
  Language.findOne = function (query, ...args) {
    if (mongoose.connection.readyState === 1) {
      return origLanguageFindOne.call(Language, query, ...args);
    }

    if (query && query.slug) {
      const slug = String(query.slug).toLowerCase().trim();
      const lang = inMemoryLanguages.get(slug);
      return Promise.resolve(lang ? createMockLanguageDoc(lang) : null);
    }
    return Promise.resolve(null);
  };

  const origLanguageCount = Language.countDocuments;
  Language.countDocuments = function (...args) {
    if (mongoose.connection.readyState === 1) {
      return origLanguageCount.call(Language, ...args);
    }
    return Promise.resolve(inMemoryLanguages.size);
  };

  const origLanguageFindOneAndUpdate = Language.findOneAndUpdate;
  Language.findOneAndUpdate = function (query, update, options, ...args) {
    if (mongoose.connection.readyState === 1) {
      return origLanguageFindOneAndUpdate.call(Language, query, update, options, ...args);
    }

    if (query && query.slug) {
      const slug = String(query.slug).toLowerCase().trim();
      let lang = inMemoryLanguages.get(slug);
      if (!lang && update.$setOnInsert) {
        lang = createMockLanguageDoc(update.$setOnInsert);
        inMemoryLanguages.set(slug, lang);
      }
      return Promise.resolve(lang);
    }
    return Promise.resolve(null);
  };

  // 5. Patch Track model methods if Track is provided
  if (Track) {
    for (const track of DEFAULT_TRACKS) {
      inMemoryTracks.set(track.slug, createMockTrackDoc(track));
    }

    const origTrackFind = Track.find;
    Track.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1) {
        return origTrackFind.call(Track, query, ...args);
      }

      let results = Array.from(inMemoryTracks.values()).map(createMockTrackDoc);
      if (query.isActive !== undefined) {
        results = results.filter((t) => t.isActive === query.isActive);
      }
      results.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

      const chain = {
        sort: () => chain,
        lean: () => chain,
        exec: () => Promise.resolve(results),
        then: (resolve, reject) => Promise.resolve(results).then(resolve, reject),
        catch: (reject) => Promise.resolve(results).catch(reject),
      };
      return chain;
    };

    const origTrackFindOne = Track.findOne;
    Track.findOne = function (query, ...args) {
      if (mongoose.connection.readyState === 1) {
        return origTrackFindOne.call(Track, query, ...args);
      }

      if (query && query.slug) {
        const slug = String(query.slug).toLowerCase().trim();
        const tr = inMemoryTracks.get(slug);
        return Promise.resolve(tr ? createMockTrackDoc(tr) : null);
      }
      return Promise.resolve(null);
    };

    const origTrackCount = Track.countDocuments;
    Track.countDocuments = function (...args) {
      if (mongoose.connection.readyState === 1) {
        return origTrackCount.call(Track, ...args);
      }
      return Promise.resolve(inMemoryTracks.size);
    };

    const origTrackFindOneAndUpdate = Track.findOneAndUpdate;
    Track.findOneAndUpdate = function (query, update, options, ...args) {
      if (mongoose.connection.readyState === 1) {
        return origTrackFindOneAndUpdate.call(Track, query, update, options, ...args);
      }

      if (query && query.slug) {
        const slug = String(query.slug).toLowerCase().trim();
        let tr = inMemoryTracks.get(slug);
        if (!tr && update.$setOnInsert) {
          tr = createMockTrackDoc(update.$setOnInsert);
          inMemoryTracks.set(slug, tr);
        }
        return Promise.resolve(tr);
      }
      return Promise.resolve(null);
    };
  }

  // 6. Patch Batch model methods if Batch is provided
  if (Batch) {
    for (const batch of DEFAULT_BATCHES) {
      inMemoryBatches.set(String(batch._id), createMockBatchDoc(batch));
    }

    const origBatchFind = Batch.find;
    Batch.find = function (query = {}, ...args) {
      if (mongoose.connection.readyState === 1) {
        return origBatchFind.call(Batch, query, ...args);
      }

      let results = Array.from(inMemoryBatches.values()).map(createMockBatchDoc);
      if (query.status) {
        results = results.filter((b) => b.status === query.status);
      }

      const chain = {
        sort: () => chain,
        exec: () => Promise.resolve(results),
        then: (resolve, reject) => Promise.resolve(results).then(resolve, reject),
        catch: (reject) => Promise.resolve(results).catch(reject),
      };
      return chain;
    };

    const origBatchFindById = Batch.findById;
    Batch.findById = function (id, ...args) {
      if (mongoose.connection.readyState === 1) {
        return origBatchFindById.call(Batch, id, ...args);
      }

      const idStr = String(id);
      const b = inMemoryBatches.get(idStr);
      return Promise.resolve(b ? createMockBatchDoc(b) : null);
    };

    const origBatchCount = Batch.countDocuments;
    Batch.countDocuments = function (...args) {
      if (mongoose.connection.readyState === 1) {
        return origBatchCount.call(Batch, ...args);
      }
      return Promise.resolve(inMemoryBatches.size);
    };

    const origBatchCreate = Batch.create;
    Batch.create = function (data, ...args) {
      if (mongoose.connection.readyState === 1) {
        return origBatchCreate.call(Batch, data, ...args);
      }

      const doc = createMockBatchDoc(data);
      inMemoryBatches.set(String(doc._id), doc);
      return Promise.resolve(doc);
    };

    const origBatchFindByIdAndUpdate = Batch.findByIdAndUpdate;
    Batch.findByIdAndUpdate = function (id, update, options, ...args) {
      if (mongoose.connection.readyState === 1) {
        return origBatchFindByIdAndUpdate.call(Batch, id, update, options, ...args);
      }

      const idStr = String(id);
      let b = inMemoryBatches.get(idStr);
      if (b) {
        Object.assign(b, update, { updatedAt: new Date() });
        inMemoryBatches.set(idStr, b);
      }
      return Promise.resolve(b ? createMockBatchDoc(b) : null);
    };

    const origBatchFindByIdAndDelete = Batch.findByIdAndDelete;
    Batch.findByIdAndDelete = function (id, ...args) {
      if (mongoose.connection.readyState === 1) {
        return origBatchFindByIdAndDelete.call(Batch, id, ...args);
      }

      const idStr = String(id);
      const b = inMemoryBatches.get(idStr);
      inMemoryBatches.delete(idStr);
      return Promise.resolve(b ? createMockBatchDoc(b) : null);
    };

    const origBatchInsertMany = Batch.insertMany;
    Batch.insertMany = function (docs, ...args) {
      if (mongoose.connection.readyState === 1) {
        return origBatchInsertMany.call(Batch, docs, ...args);
      }

      const created = docs.map((d) => {
        const doc = createMockBatchDoc(d);
        inMemoryBatches.set(String(doc._id), doc);
        return doc;
      });
      return Promise.resolve(created);
    };
  }

  logger.info('[DevFallbackStore] In-Memory Data Store active with default accounts:');
  logger.info('  -> Student: student@codeforge.dev / Student@123');
  logger.info('  -> Admin:   admin@codeforge.dev   / Admin@123');
};

