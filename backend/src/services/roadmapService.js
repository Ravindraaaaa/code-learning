import Roadmap from '../models/Roadmap.js';
import Topic from '../models/Topic.js';
import Lesson from '../models/Lesson.js';

export const generateRoadmapService = async (studentId, data) => {
  const { trackId, languageId, level } = data;

  // Deactivate any existing active roadmaps for this student
  await Roadmap.updateMany({ student: studentId, isActive: true }, { isActive: false });

  // Determine difficulty levels to include
  const difficultyLevels = {
    'Beginner': ['Beginner', 'Intermediate', 'Advanced'],
    'Intermediate': ['Intermediate', 'Advanced'],
    'Advanced': ['Advanced']
  };
  const includedDifficulties = difficultyLevels[level] || ['Beginner', 'Intermediate', 'Advanced'];

  // Fetch topics matching track or language, and difficulty
  const filter = { status: 'published', difficulty: { $in: includedDifficulties } };
  if (trackId) filter.track = trackId;
  if (languageId) filter.language = languageId;

  const topics = await Topic.find(filter).sort({ order: 1 });

  const roadmapTopics = [];
  
  for (const topic of topics) {
    const lessons = await Lesson.find({ topic: topic._id, status: 'published' }).sort({ order: 1 });
    
    if (lessons.length > 0) {
      const roadmapLessons = lessons.map(lesson => ({
        lesson: lesson._id,
        status: 'pending'
      }));

      roadmapTopics.push({
        topic: topic._id,
        status: 'pending',
        lessons: roadmapLessons
      });
    }
  }

  const roadmap = new Roadmap({
    student: studentId,
    track: trackId || null,
    language: languageId || null,
    level,
    topics: roadmapTopics,
    progressPercentage: 0,
    isActive: true
  });

  await roadmap.save();
  return roadmap;
};

export const getStudentRoadmapService = async (studentId) => {
  const roadmap = await Roadmap.findOne({ student: studentId, isActive: true })
    .populate({
      path: 'topics.topic',
      select: 'title description difficulty order'
    })
    .populate({
      path: 'topics.lessons.lesson',
      select: 'title content difficulty estimatedTime order'
    });
    
  if (!roadmap) {
    const error = new Error('No active roadmap found for this student');
    error.statusCode = 404;
    throw error;
  }
  return roadmap;
};

export const updateRoadmapProgressService = async (studentId, lessonId) => {
  const roadmap = await Roadmap.findOne({ student: studentId, isActive: true });
  if (!roadmap) return null; // No roadmap to update, just return

  let totalLessons = 0;
  let completedLessons = 0;
  let topicUpdated = false;

  for (const rTopic of roadmap.topics) {
    let topicCompleted = true;
    for (const rLesson of rTopic.lessons) {
      totalLessons++;
      if (rLesson.lesson.toString() === lessonId.toString()) {
        rLesson.status = 'completed';
        topicUpdated = true;
      }
      if (rLesson.status === 'completed') {
        completedLessons++;
      } else {
        topicCompleted = false;
      }
    }
    
    if (topicCompleted) {
      rTopic.status = 'completed';
    } else if (rTopic.lessons.some(l => l.status === 'completed')) {
      rTopic.status = 'in_progress';
    }
  }

  if (topicUpdated) {
    roadmap.progressPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    await roadmap.save();
  }

  return roadmap;
};
