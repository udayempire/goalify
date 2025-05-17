'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface GoalItem {
  goalId: string;
  ipfsUrl: string;
  data: {
    title: string;
    description: string;
    rules: string[];
    stakeAmount: number;
    goalCreatorWalletAddress: string;
    registrationDate: string;
    endDate: string;
    participants: string[];
    status: string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function GoalGroups() {
  const router = useRouter();
  const [goals, setGoals] = useState<GoalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/goals/lists')
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setGoals(json.goals);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading goals…</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">
          Available Goals to Stake
        </h1>
        <button
          onClick={() => router.push('/goal-groups/create-goal')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
        >
          Create your own Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <p className="text-gray-300">No goals created yet.</p>
      ) : (
        <div className="space-y-4">
          {goals.map(({ goalId, data }) => (
            <div
              key={goalId}
              className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-700 shadow-xl"
            >
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-white">
                    {data.title}
                  </h2>
                  <p className="text-gray-300">{data.description}</p>
                  <div className="flex gap-6 text-sm text-gray-400">
                    <span>
                      Stake Amount:{' '}
                      <span className="text-green-400">
                        {data.stakeAmount} SOL
                      </span>
                    </span>
                    <span>Participants: {data.participants.length}</span>
                    <span>Starts: {data.registrationDate}</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/goal-groups/${goalId}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
