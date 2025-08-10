export default function MyGoals() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">My Active Goals</h1>
      <div className="grid grid-cols-1 gap-6">
        {myCurrentGoals.map((goal, index) => (
          <div
            key={index}
            className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-700 shadow-xl"
          >
            <div className="flex justify-between items-center">
              <div className="space-y-2 flex-grow">
                <h2 className="text-xl font-semibold text-white">
                  {goal.name}
                </h2>
                <p className="text-gray-300">{goal.description}</p>
                <div className="flex gap-6 text-sm text-gray-400">
                  <span>
                    Time Left:{" "}
                    <span className="text-blue-400">{goal.daysLeft}</span>
                  </span>
                  <span>
                    Staked:{" "}
                    <span className="text-green-400">{goal.stakeAmount}</span>
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300">
                  Upload Proof
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300">
                  View Details
                </button>
              </div>
            </div>
            <div className="mt-4 w-full bg-neutral-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: goal.progress }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const myCurrentGoals = [
  {
    name: "Daily Workout Challenge",
    description: "30 minutes of exercise daily",
    daysLeft: "18 days remaining",
    stakeAmount: "0.5 SOL",
    progress: "40%",
  },
  {
    name: "Reading Marathon",
    description: "Read 20 pages every day",
    daysLeft: "45 days remaining",
    stakeAmount: "0.3 SOL",
    progress: "25%",
  },
  {
    name: "Meditation Practice",
    description: "15 minutes daily meditation",
    daysLeft: "12 days remaining",
    stakeAmount: "0.2 SOL",
    progress: "60%",
  },
];
