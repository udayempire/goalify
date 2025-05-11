'use client'
import { useState } from 'react';

export default function ValidateGoals() {
  const [votedGoals, setVotedGoals] = useState<{ [key: number]: 'yes' | 'no' }>({});

  const handleVote = (index: number, vote: 'yes' | 'no') => {
    setVotedGoals(prev => ({
      ...prev,
      [index]: vote
    }));
  };

  const validationGoals = [
    {
      name: "Daily Workout Challenge",
      description: "Completed 30 minutes of exercise",
      submittedDate: "2 hours ago",
      votes: 3,
    },
    {
      name: "Reading Goal",
      description: "Read 20 pages of 'The Psychology of Money'",
      submittedDate: "5 hours ago", 
      votes: -1,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Goals to Validate</h1>
      <div className="space-y-4">
        {validationGoals.map((goal, index) => (
          <div key={index} className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-700 shadow-xl">
            <div className="space-y-2 mb-6">
              <h2 className="text-xl font-semibold text-white">{goal.name}</h2>
              <p className="text-gray-300">{goal.description}</p>
              <div className="flex gap-6 text-sm text-gray-400">
                <span>Submitted: {goal.submittedDate}</span>
                <span>Current Votes: <span className={goal.votes >= 0 ? "text-green-400" : "text-red-400"}>{goal.votes}</span></span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-end gap-2">
                {votedGoals[index] ? (
                  <div className="text-gray-400">
                    Voted: <span className={votedGoals[index] === 'yes' ? 'text-green-400' : 'text-red-400'}>
                      {votedGoals[index].toUpperCase()}
                    </span>
                  </div>
                ) : (
                  <>
                    <button 
                      onClick={() => handleVote(index, 'yes')}
                      className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
                    >
                      Vote Yes
                    </button>
                    <button 
                      onClick={() => handleVote(index, 'no')}
                      className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
                    >
                      Vote No
                    </button>
                    <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300">
                      Flag
                    </button>
                  </>
                )}
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300">
                View Proof
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
