import { Track, User } from '../models/index.js';
import { isDBConnected } from '../config/db.js';

/**
 * Standard CodeForge Platform Learning Tracks
 * Adheres strictly to: Web Development (HTML, CSS, JavaScript, React, Node.js, MongoDB)
 */
export const DEFAULT_TRACKS = [
  {
    name: 'Web Development',
    slug: 'web-development',
    description: 'Master full-stack modern web engineering from semantic markup and responsive styles to scalable server architectures and database design.',
    category: 'Full-Stack Development',
    level: 'Beginner to Advanced',
    estimatedHours: 140,
    isActive: true,
    displayOrder: 1,
    modules: [
      {
        name: 'HTML',
        slug: 'html',
        order: 1,
        level: 'Foundational',
        topicsCount: 12,
        estimatedHours: 15,
        description: 'Semantic HTML5 structure, accessible forms, audio/video elements, metadata, and modern DOM document hierarchy.',
      },
      {
        name: 'CSS',
        slug: 'css',
        order: 2,
        level: 'Styling & Layout',
        topicsCount: 16,
        estimatedHours: 20,
        description: 'Responsive styling, Flexbox, CSS Grid layouts, custom CSS variables, media queries, animations, and modern UI tokens.',
      },
      {
        name: 'JavaScript',
        slug: 'javascript',
        order: 3,
        level: 'Client-Side Logic',
        topicsCount: 24,
        estimatedHours: 30,
        description: 'Core ECMAScript, closures, asynchronous promises & async/await, event bubbling, DOM manipulation, and modern ES6+ tooling.',
      },
      {
        name: 'React',
        slug: 'react',
        order: 4,
        level: 'Frontend Architecture',
        topicsCount: 20,
        estimatedHours: 25,
        description: 'Component architecture, JSX, hooks (useState, useEffect, useMemo, custom hooks), Context API, SPA routing, and client performance.',
      },
      {
        name: 'Node.js',
        slug: 'nodejs',
        order: 5,
        level: 'Backend Runtime',
        topicsCount: 18,
        estimatedHours: 25,
        description: 'Asynchronous event loop, Express.js REST API engineering, middleware pipelines, error handling, authentication tokens, and server security.',
      },
      {
        name: 'MongoDB',
        slug: 'mongodb',
        order: 6,
        level: 'Database Architecture',
        topicsCount: 14,
        estimatedHours: 25,
        description: 'Document database modeling, Mongoose schemas, validation, aggregation pipelines, compound indexing, and resilient query design.',
      },
    ],
  },
];

/**
 * Idempotently ensure canonical learning tracks exist in MongoDB.
 * Does NOT seed fake student data.
 */
export const ensureDefaultTracks = async () => {
  if (!isDBConnected()) return DEFAULT_TRACKS;

  try {
    for (const track of DEFAULT_TRACKS) {
      await Track.findOneAndUpdate(
        { slug: track.slug },
        { $setOnInsert: track },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
  } catch (err) {
    // If concurrent initialization occurs, continue safely
  }
};

/**
 * Retrieve all active learning tracks.
 *
 * @param {Object} options
 * @param {boolean} options.activeOnly - Filter by isActive
 * @returns {Promise<Array>} List of tracks
 */
export const getAllTracks = async ({ activeOnly = true } = {}) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  const count = await Track.countDocuments();
  if (count === 0) {
    await ensureDefaultTracks();
  }

  const query = activeOnly ? { isActive: true } : {};
  const tracks = await Track.find(query).sort({ displayOrder: 1, name: 1 });
  return tracks;
};

/**
 * Retrieve a learning track by slug.
 *
 * @param {string} slug - Track unique slug (e.g. 'web-development')
 * @returns {Promise<Object>} Track document
 */
export const getTrackBySlug = async (slug) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable.');
    error.statusCode = 503;
    throw error;
  }

  if (!slug || typeof slug !== 'string') {
    const error = new Error('Valid track slug is required');
    error.statusCode = 400;
    throw error;
  }

  const normalizedSlug = slug.trim().toLowerCase();
  const track = await Track.findOne({ slug: normalizedSlug, isActive: true });
  return track;
};

/**
 * Enroll / select active learning track for an authenticated student.
 * Updates user.roadmap in database and records activity log.
 *
 * @param {string} userId - Authenticated user MongoDB ObjectId
 * @param {string} trackSlug - Slug of the target track (e.g. 'web-development')
 * @returns {Promise<Object>} Updated student roadmap and track details
 */
export const selectStudentTrack = async (userId, trackSlug) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable. Please verify MongoDB is running.');
    error.statusCode = 503;
    throw error;
  }

  if (!trackSlug || typeof trackSlug !== 'string') {
    const error = new Error('Track slug is required');
    error.statusCode = 400;
    throw error;
  }

  const normalizedSlug = trackSlug.trim().toLowerCase();

  let track = await Track.findOne({ slug: normalizedSlug, isActive: true });
  if (!track && DEFAULT_TRACKS.some((t) => t.slug === normalizedSlug)) {
    await ensureDefaultTracks();
    track = await Track.findOne({ slug: normalizedSlug, isActive: true });
  }

  if (!track) {
    const error = new Error(`Unsupported learning track: '${trackSlug}'. Available tracks: Web Development`);
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('Student account not found');
    error.statusCode = 404;
    throw error;
  }

  const initialModule = track.modules?.[0]?.name || 'HTML';

  user.roadmap = {
    enrolled: true,
    title: track.name,
    trackId: track.slug,
    currentModule: initialModule,
    completedModules: 0,
    totalModules: track.modules?.length || 6,
  };

  if (Array.isArray(user.recentActivity)) {
    user.recentActivity.unshift({
      activityType: 'lesson_completed',
      title: `Enrolled in ${track.name} Track`,
      detail: `Commenced curriculum with ${initialModule} (${track.modules?.length || 6} modules total)`,
      timestamp: new Date(),
    });

    if (user.recentActivity.length > 20) {
      user.recentActivity = user.recentActivity.slice(0, 20);
    }
  }

  await user.save();

  return {
    student: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    roadmap: user.roadmap,
    selectedTrack: track,
  };
};

/**
 * Get student's currently enrolled track.
 *
 * @param {string} userId - Authenticated user MongoDB ObjectId
 * @returns {Promise<Object>} Enrolled track status and track metadata
 */
export const getStudentSelectedTrack = async (userId) => {
  if (!isDBConnected()) {
    const error = new Error('Database service is currently unavailable.');
    error.statusCode = 503;
    throw error;
  }

  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('Student account not found');
    error.statusCode = 404;
    throw error;
  }

  if (!user.roadmap || !user.roadmap.enrolled) {
    return {
      enrolled: false,
      roadmap: null,
      track: null,
    };
  }

  const track = await Track.findOne({ slug: user.roadmap.trackId, isActive: true });

  return {
    enrolled: true,
    roadmap: user.roadmap,
    track: track || null,
  };
};
