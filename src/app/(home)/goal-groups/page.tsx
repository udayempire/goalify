'use client'
import { useRouter } from "next/navigation";

export default function GoalGroups() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white ">
          Available Goals to Stake
        </h1>
        <button
          onClick={() => router.push("/goal-groups/create-goal")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
        >
          Create your own Goal
        </button>
      </div>
      <div className="space-y-4">
        {goals.map((goal, index) => (
          <div
            key={index}
            className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-700 shadow-xl"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-white">
                  {goal.name}
                </h2>
                <p className="text-gray-300">{goal.description}</p>
                <div className="flex gap-6 text-sm text-gray-400">
                  <span>
                    Stake Amount:{" "}
                    <span className="text-green-400">{goal.stakeAmount}</span>
                  </span>
                  <span>Participants: {goal.peopleJoined}</span>
                  <span>Starts: {goal.startDate}</span>
                </div>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const goals = [
  {
    name: "Daily Workout Challenge",
    description: "Complete 30 minutes of exercise daily for 30 days",
    stakeAmount: "0.5 SOL",
    peopleJoined: 24,
    startDate: "Feb 1, 2024",
  },
  {
    name: "Reading Marathon",
    description: "Read 20 pages every day for 2 months",
    stakeAmount: "0.3 SOL",
    peopleJoined: 18,
    startDate: "Feb 5, 2024",
  },
  {
    name: "Meditation Practice",
    description: "Meditate for 15 minutes daily for 21 days",
    stakeAmount: "0.2 SOL",
    peopleJoined: 32,
    startDate: "Feb 3, 2024",
  },
];
