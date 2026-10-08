import User from './User.js';
import Language from './Language.js';
import Track from './Track.js';
import Topic from './Topic.js';
import Lesson from './Lesson.js';
import LessonProgress from './LessonProgress.js';
import AssessmentQuestion from './AssessmentQuestion.js';
import AssessmentSubmission from './AssessmentSubmission.js';
import Roadmap from './Roadmap.js';
import DebugChallenge from './DebugChallenge.js';
import DebugAttempt from './DebugAttempt.js';
import WeeklyTest from './WeeklyTest.js';
import WeeklyTestQuestion from './WeeklyTestQuestion.js';
import WeeklyTestResult from './WeeklyTestResult.js';
import Competition from './Competition.js';
import CompetitionQuestion from './CompetitionQuestion.js';
import CompetitionParticipation from './CompetitionParticipation.js';
import Batch from './Batch.js';

export { 
  User, Language, Track, Topic, Lesson, LessonProgress, AssessmentQuestion, 
  AssessmentSubmission, Roadmap, DebugChallenge, DebugAttempt, WeeklyTest, 
  WeeklyTestQuestion, WeeklyTestResult, Competition, CompetitionQuestion, 
  CompetitionParticipation, Batch 
};

export const models = {
  User,
  Language,
  Track,
  Topic,
  Lesson,
  LessonProgress,
  AssessmentQuestion,
  AssessmentSubmission,
  Roadmap,
  DebugChallenge,
  DebugAttempt,
  WeeklyTest,
  WeeklyTestQuestion,
  WeeklyTestResult,
  Competition,
  CompetitionQuestion,
  CompetitionParticipation,
  Batch
};

export default models;

