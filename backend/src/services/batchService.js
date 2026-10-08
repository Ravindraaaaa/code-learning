import Batch from '../models/Batch.js';
import { logger } from '../utils/logger.js';

export const DEFAULT_BATCHES = [
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d1',
    name: 'Web Dev & DSA Foundation Batch',
    description: 'Master core Data Structures, Algorithms, HTML, CSS, JavaScript, React, Node.js, and MongoDB with interactive coding labs.',
    features: [
      'Interactive Monaco Code Execution',
      'Real-time Debugging Arenas',
      'Timed Weekly Assessment Tests',
      'Live Contest Arena & Leaderboards',
      '24/7 AI Mentor Assistance'
    ],
    price: 49,
    currency: '₹',
    status: 'active'
  },
  {
    _id: '65f1a2b3c4d5e6f7a8b9c0d2',
    name: 'Advanced System Design & Microservices Cohort',
    description: 'Deep dive into scalable system design, distributed caching, database indexing, and cloud deployment pipelines.',
    features: [
      'System Architecture Case Studies',
      'High-Concurrency Load Simulation',
      'Database Optimization Labs',
      '1-on-1 Code Reviews'
    ],
    price: 149,
    currency: '₹',
    status: 'active'
  }
];

export const seedBatchesIfEmpty = async () => {
  try {
    const count = await Batch.countDocuments();
    if (count === 0) {
      await Batch.insertMany(DEFAULT_BATCHES);
      logger.info('Seeded initial default batches (Starting price: ₹49)');
    }
  } catch (error) {
    logger.warn(`Failed to seed batches automatically: ${error.message}`);
  }
};

export const getAllBatchesService = async (query = {}) => {
  await seedBatchesIfEmpty();
  const filter = {};
  if (query.status) {
    filter.status = query.status;
  }
  const batches = await Batch.find(filter).sort({ createdAt: -1 });
  return batches;
};

export const getBatchByIdService = async (id) => {
  const batch = await Batch.findById(id);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 44;
    throw error;
  }
  return batch;
};

export const createBatchService = async (data) => {
  const batch = await Batch.create({
    name: data.name,
    description: data.description || '',
    features: Array.isArray(data.features) ? data.features : (data.features ? data.features.split(',').map(f => f.trim()) : []),
    price: data.price !== undefined ? Number(data.price) : 49,
    currency: data.currency || '₹',
    status: data.status || 'active'
  });
  return batch;
};

export const updateBatchService = async (id, data) => {
  const updateData = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.features !== undefined) {
    updateData.features = Array.isArray(data.features) ? data.features : data.features.split(',').map(f => f.trim());
  }
  if (data.price !== undefined) updateData.price = Number(data.price);
  if (data.currency !== undefined) updateData.currency = data.currency;
  if (data.status !== undefined) updateData.status = data.status;

  const batch = await Batch.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }
  return batch;
};

export const deleteBatchService = async (id) => {
  const batch = await Batch.findByIdAndDelete(id);
  if (!batch) {
    const error = new Error('Batch not found');
    error.statusCode = 404;
    throw error;
  }
  return { id };
};
