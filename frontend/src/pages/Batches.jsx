import React, { useState, useEffect } from 'react';
import { Users, CheckCircle2, DollarSign, Tag, Edit3, Plus, Shield, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Modal } from '../components/common/Modal.jsx';
import { Input } from '../components/common/Input.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { getBatches, createBatch, updateBatch } from '../services/api.js';

export const Batches = () => {
  const { user, isAdmin } = useAuth();
  const [batches, setBatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit/Create Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    features: '',
    price: 49,
    currency: '₹',
    status: 'active',
  });

  const fetchBatches = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getBatches();
      if (res && res.data) {
        setBatches(res.data);
      }
    } catch (err) {
      console.error('Failed to load batches:', err);
      setError(err.message || 'Failed to fetch batch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingBatch(null);
    setFormData({
      name: '',
      description: '',
      features: '',
      price: 49,
      currency: '₹',
      status: 'active',
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (batch) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name || '',
      description: batch.description || '',
      features: Array.isArray(batch.features) ? batch.features.join(', ') : (batch.features || ''),
      price: batch.price !== undefined ? batch.price : 49,
      currency: batch.currency || '₹',
      status: batch.status || 'active',
    });
    setIsModalOpen(true);
  };

  const handleSubmitBatch = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const payload = {
        ...formData,
        price: Number(formData.price),
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
      };

      if (editingBatch) {
        await updateBatch(editingBatch._id, payload);
      } else {
        await createBatch(payload);
      }

      setIsModalOpen(false);
      fetchBatches();
    } catch (err) {
      alert(err.message || 'Failed to save batch');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-850 to-indigo-950/40 p-6 rounded-2xl border border-slate-700/50 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-violet-500/20 rounded-xl border border-violet-500/30 text-violet-400">
            <Users className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-100">Batches & Learning Cohorts</h1>
              {isAdmin && (
                <Badge variant="violet" className="flex items-center gap-1 text-xs">
                  <Shield className="w-3 h-3" /> Admin Access
                </Badge>
              )}
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Explore structured learning batches with live labs, assessments, and AI guidance.
            </p>
          </div>
        </div>

        {isAdmin && (
          <Button
            variant="primary"
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25"
          >
            <Plus className="w-4 h-4" /> Create New Batch
          </Button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center gap-3 text-rose-400">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-20 text-slate-400 gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
          <span>Loading batch information...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => (
            <Card
              key={batch._id}
              className="flex flex-col justify-between border-slate-700/60 bg-slate-900/60 backdrop-blur-sm hover:border-violet-500/50 transition-all group duration-300 relative overflow-hidden"
            >
              {/* Subtle accent border top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-500 opacity-80" />

              <div className="p-6 space-y-4">
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-violet-300 transition-colors">
                      {batch.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{batch.description}</p>
                  </div>
                  <Badge
                    variant={batch.status === 'active' ? 'success' : 'secondary'}
                    className="capitalize shrink-0"
                  >
                    {batch.status}
                  </Badge>
                </div>

                {/* Price Display */}
                <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/50 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-medium block">Enrollment Price</span>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-3xl font-extrabold text-slate-100">{batch.currency}{batch.price}</span>
                      <span className="text-xs text-slate-400">/ cohort</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <Sparkles className="w-3 h-3 mr-1" /> Best Value
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">What's Included:</h4>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {batch.features && batch.features.length > 0 ? (
                      batch.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-slate-500 italic">No specific features listed.</li>
                    )}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-3">
                {isAdmin ? (
                  <Button
                    variant="outline"
                    onClick={() => handleOpenEditModal(batch)}
                    className="w-full flex items-center justify-center gap-2 border-violet-500/40 text-violet-300 hover:bg-violet-500/20"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Price & Details
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500"
                    onClick={() => alert(`Enrolled in ${batch.name}. Price: ${batch.currency}${batch.price}`)}
                  >
                    Join Cohort ({batch.currency}{batch.price})
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Admin Edit/Create Batch Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBatch ? 'Update Batch Price & Details' : 'Create New Learning Batch'}
      >
        <form onSubmit={handleSubmitBatch} className="space-y-4 pt-2">
          <Input
            label="Batch Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g. Full Stack Web Dev & DSA"
            required
          />

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief summary of what this batch covers..."
              rows={3}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 text-sm outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Price</label>
              <input
                type="number"
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 text-sm outline-none focus:border-violet-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Currency Symbol</label>
              <input
                type="text"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 text-sm outline-none focus:border-violet-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Features (comma separated)
            </label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Live Coding Labs, Debugging Arenas, AI Mentorship"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 text-sm outline-none focus:border-violet-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 text-sm outline-none focus:border-violet-500 transition-colors cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="upcoming">Upcoming</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : editingBatch ? 'Update Batch' : 'Create Batch'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Batches;
