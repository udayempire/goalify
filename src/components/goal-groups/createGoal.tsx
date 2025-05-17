'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useWallet } from '@solana/wallet-adapter-react';

interface CreateGoalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGoalModal({ isOpen, onClose }: CreateGoalProps) {
  const { publicKey, connected } = useWallet();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    rules: '',
    stakeAmount: 0,
    registrationDate: '',
    endDate: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'stakeAmount' ? parseFloat(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey) {
      alert('Please connect your wallet first.');
      return;
    }

    setSubmitting(true);
    const walletAddress = publicKey.toBase58();

    // Build the payload matching your CreateGoalRequest
    const payload = {
      title: formData.title,
      description: formData.description,
      rules: formData.rules
        .split('\n')
        .map(r => r.trim())
        .filter(r => r),
      stakeAmount: formData.stakeAmount,
      goalCreatorWalletAddress: walletAddress,
      registrationDate: formData.registrationDate,
      endDate: formData.endDate,
      // participants: only the creator at first
      participants: [walletAddress],
    };

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      console.log('Pinned goal to IPFS:', data);
      onClose();
    } catch (err: any) {
      console.error('Failed to create goal:', err);
      alert('Failed to create goal: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold text-gray-900">
              Create New Goal
            </Dialog.Title>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={3}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            {/* Rules */}
            <div>
              <label htmlFor="rules" className="block text-sm font-medium text-gray-700">
                Rules (one per line)
              </label>
              <textarea
                name="rules"
                id="rules"
                rows={2}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                value={formData.rules}
                onChange={handleChange}
              />
            </div>

            {/* Stake Amount */}
            <div>
              <label htmlFor="stakeAmount" className="block text-sm font-medium text-gray-700">
                Stake Amount (SOL)
              </label>
              <input
                type="number"
                name="stakeAmount"
                id="stakeAmount"
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                value={formData.stakeAmount}
                onChange={handleChange}
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">
                  Registration Date
                </label>
                <input
                  type="date"
                  name="registrationDate"
                  id="registrationDate"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                  value={formData.registrationDate}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500"
                  value={formData.endDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-[#9945FF] via-[#8752F3] to-[#14F195] text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? 'Creating…' : 'Create Goal'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
