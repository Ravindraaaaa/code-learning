import React, { useState, useEffect } from 'react';
import {
  Users,
  CheckCircle2,
  Edit3,
  Plus,
  Shield,
  Sparkles,
  Loader2,
  AlertCircle,
  Lock,
  CreditCard,
  Receipt,
  ShieldCheck,
  Check,
  FileCheck
} from 'lucide-react';
import { Card } from '../components/common/Card.jsx';
import { Button } from '../components/common/Button.jsx';
import { Badge } from '../components/common/Badge.jsx';
import { Modal } from '../components/common/Modal.jsx';
import { Input } from '../components/common/Input.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  getBatches,
  createBatch,
  updateBatch,
  getMyPurchases,
  createPurchaseOrder,
  verifyPayment
} from '../services/api.js';

export const Batches = () => {
  const { user, isAdmin } = useAuth();
  const [batches, setBatches] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Admin Edit/Create Modal State
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

  // Gateway Order & Verification State
  const [activeOrder, setActiveOrder] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('UPI_SANDBOX');

  // Receipt Modal State
  const [receiptData, setReceiptData] = useState(null);

  const fetchBatchesAndPurchases = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const batchesRes = await getBatches();
      if (batchesRes && batchesRes.data) {
        setBatches(batchesRes.data);
      }

      if (user && !isAdmin) {
        try {
          const purchasesRes = await getMyPurchases();
          if (purchasesRes && purchasesRes.data) {
            setMyPurchases(purchasesRes.data);
          }
        } catch (pErr) {
          console.warn('Could not fetch student purchases:', pErr);
        }
      }
    } catch (err) {
      console.error('Failed to load batches:', err);
      setError(err.message || 'Failed to fetch batch data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBatchesAndPurchases();
  }, [user, isAdmin]);

  // Check if a batch is already purchased and activated
  const getPurchaseForBatch = (batchId) => {
    return myPurchases.find(
      (p) => (p.batch?._id || p.batch) === batchId && p.paymentStatus === 'completed'
    );
  };

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
      fetchBatchesAndPurchases();
    } catch (err) {
      alert(err.message || 'Failed to save batch');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 1: Create Payment Order with Gateway
  const handleInitiatePurchase = async (batch) => {
    try {
      setIsCreatingOrder(true);
      const res = await createPurchaseOrder(batch._id);
      if (res && res.data) {
        setActiveOrder({
          ...res.data,
          batchName: batch.name,
          batchId: batch._id,
        });
        setPaymentMethod('UPI_SANDBOX');
      }
    } catch (err) {
      alert(err.message || 'Failed to initialize payment order');
    } finally {
      setIsCreatingOrder(false);
    }
  };

  // Step 2: Perform Server-Side Payment Verification & Content Activation
  const handleVerifyPayment = async () => {
    if (!activeOrder) return;

    try {
      setIsVerifyingPayment(true);
      const res = await verifyPayment({
        orderId: activeOrder.orderId,
        paymentId: activeOrder.sandboxPaymentId,
        signature: activeOrder.sandboxSignature,
        paymentMethod,
      });

      if (res && res.data) {
        const verifiedPurchase = res.data;
        setReceiptData({
          ...verifiedPurchase,
          batchName: activeOrder.batchName,
        });
        setActiveOrder(null);
        fetchBatchesAndPurchases();
      }
    } catch (err) {
      alert(err.message || 'Server-side payment verification failed');
    } finally {
      setIsVerifyingPayment(false);
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
              Enroll in structured cohorts with live labs, debug arenas, and server-verified content activation.
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

      {/* Security Disclaimer Banner */}
      <div className="p-4 bg-slate-900/80 border border-slate-700/60 rounded-xl flex items-start md:items-center gap-3 text-slate-300 text-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 md:mt-0" />
        <div>
          <span className="font-semibold text-emerald-400 mr-1">Server-Side Payment Verification Policy:</span>
          <span>
            Frontend payment claims are never trusted. The backend verifies payment HMAC signatures directly with the gateway. Only verified payments activate purchased content, with immutable price lock.
          </span>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20 text-slate-400 gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-violet-500" />
          <span>Loading batch information...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {batches.map((batch) => {
            const existingPurchase = getPurchaseForBatch(batch._id);
            const isPurchased = Boolean(existingPurchase);

            return (
              <Card
                key={batch._id}
                className="flex flex-col justify-between border-slate-700/60 bg-slate-900/60 backdrop-blur-sm hover:border-violet-500/50 transition-all group duration-300 relative overflow-hidden"
              >
                {/* Subtle accent border top */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                    isPurchased
                      ? 'from-emerald-500 to-teal-400'
                      : 'from-blue-500 via-violet-500 to-indigo-500'
                  } opacity-80`}
                />

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-violet-300 transition-colors">
                        {batch.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{batch.description}</p>
                    </div>
                    {isPurchased ? (
                      <Badge variant="success" className="flex items-center gap-1 shrink-0 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                        <Check className="w-3 h-3" /> Activated
                      </Badge>
                    ) : (
                      <Badge
                        variant={batch.status === 'active' ? 'success' : 'secondary'}
                        className="capitalize shrink-0"
                      >
                        {batch.status}
                      </Badge>
                    )}
                  </div>

                  {/* Price Display */}
                  <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/50 flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-slate-400 font-medium block">Enrollment Price</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-3xl font-extrabold text-slate-100">
                          {batch.currency}{batch.price}
                        </span>
                        <span className="text-xs text-slate-400">/ cohort</span>
                      </div>
                    </div>
                    <div className="text-right">
                      {isPurchased ? (
                        <span className="inline-flex items-center text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                          Paid: {existingPurchase.currency}{existingPurchase.amountPaid}
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
                          <Sparkles className="w-3 h-3 mr-1" /> Best Value
                        </span>
                      )}
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
                  ) : isPurchased ? (
                    <Button
                      variant="outline"
                      onClick={() => setReceiptData({ ...existingPurchase, batchName: batch.name })}
                      className="w-full flex items-center justify-center gap-2 border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/20"
                    >
                      <Receipt className="w-4 h-4 text-emerald-400" /> View Immutable Receipt
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      disabled={isCreatingOrder}
                      onClick={() => handleInitiatePurchase(batch)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 flex items-center justify-center gap-2"
                    >
                      {isCreatingOrder ? (
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      ) : (
                        <CreditCard className="w-4 h-4" />
                      )}
                      <span>Join Cohort ({batch.currency}{batch.price})</span>
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Gateway Verification Modal */}
      <Modal
        isOpen={Boolean(activeOrder)}
        onClose={() => setActiveOrder(null)}
        title="Gateway Server-Side Payment Verification"
      >
        {activeOrder && (
          <div className="space-y-6 pt-2">
            <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{activeOrder.batchName}</h3>
                  <span className="text-xs font-mono text-slate-400">Order ID: {activeOrder.orderId}</span>
                </div>
                <span className="text-2xl font-extrabold text-violet-400">
                  {activeOrder.currency}{activeOrder.amount}
                </span>
              </div>
            </div>

            {/* Verification Security Policy Banner */}
            <div className="p-4 bg-indigo-950/40 border border-indigo-500/30 rounded-xl space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-indigo-300">
                <FileCheck className="w-4 h-4 text-indigo-400" />
                <span>Backend Gateway Verification Required</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Frontend payment success is NOT trusted. Clicking submit sends the payment reference and HMAC signature to the server. The backend verifies HMAC authenticity with the gateway before activating content.
              </p>
            </div>

            {/* Sandbox Payment Option Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Select Payment Gateway Method:
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'UPI_SANDBOX', label: 'UPI Sandbox' },
                  { id: 'NET_BANKING_SANDBOX', label: 'Net Banking' },
                  { id: 'CARD_SANDBOX', label: 'Card Sandbox' }
                ].map((pm) => (
                  <button
                    key={pm.id}
                    type="button"
                    onClick={() => setPaymentMethod(pm.id)}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all text-center ${
                      paymentMethod === pm.id
                        ? 'bg-violet-600/20 border-violet-500 text-violet-200 shadow-md shadow-violet-500/10'
                        : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    {pm.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
              <Button variant="outline" onClick={() => setActiveOrder(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleVerifyPayment}
                disabled={isVerifyingPayment}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center gap-2"
              >
                {isVerifyingPayment ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying Gateway Signature...</span>
                  </>
                ) : (
                  <span>Verify Payment & Activate Content</span>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Immutable Receipt Modal */}
      <Modal
        isOpen={Boolean(receiptData)}
        onClose={() => setReceiptData(null)}
        title="Verified Purchase Receipt"
      >
        {receiptData && (
          <div className="space-y-5 pt-2">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-300">
              <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-semibold text-sm">Server-Verified & Activated!</h4>
                <p className="text-xs text-emerald-400/80">Gateway HMAC signature verified successfully.</p>
              </div>
            </div>

            <div className="space-y-3 bg-slate-900/80 border border-slate-700/60 p-4 rounded-xl text-sm">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-xs">Gateway Order ID</span>
                <span className="font-mono text-slate-200 text-xs font-semibold">{receiptData.orderId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-xs">Payment Transaction ID</span>
                <span className="font-mono text-slate-200 text-xs font-semibold">{receiptData.paymentId || receiptData.transactionId}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-xs">Batch Name</span>
                <span className="text-slate-200 text-xs font-medium">{receiptData.batchName || receiptData.batch?.name || 'Batch'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-xs">Immutable Amount Paid</span>
                <span className="text-emerald-400 text-sm font-bold">{receiptData.currency || '₹'}{receiptData.amountPaid}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 text-xs">Gateway Status</span>
                <span className="text-xs font-semibold uppercase text-emerald-400">{receiptData.paymentStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 text-xs">Verified Timestamp</span>
                <span className="text-slate-300 text-xs">
                  {new Date(receiptData.verifiedAt || receiptData.purchasedAt || receiptData.createdAt).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl text-slate-400 text-xs leading-relaxed">
              <strong className="text-slate-200 block mb-1">Safe Metadata Guarantee:</strong>
              Only transaction IDs, amounts, currency, and timestamps are recorded. No sensitive banking credentials are ever stored.
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="primary" onClick={() => setReceiptData(null)}>
                Close Receipt
              </Button>
            </div>
          </div>
        )}
      </Modal>

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
