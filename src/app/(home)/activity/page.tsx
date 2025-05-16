export default function Activity() {
  const completedGoals = [
    {
      goalName: "Daily Workout Challenge",
      stakedAmount: "0.5 SOL",
      rewardAmount: "0.6 SOL", 
      achieved: true
    },
    {
      goalName: "Reading Marathon",
      stakedAmount: "0.3 SOL",
      rewardAmount: "0.35 SOL",
      achieved: false
    },
    {
      goalName: "Meditation Practice", 
      stakedAmount: "0.2 SOL",
      rewardAmount: "0.25 SOL",
      achieved: true
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Goal Activity</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-neutral-800/80 backdrop-blur-sm rounded-xl border border-neutral-700">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Goal Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Staked Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Reward Amount</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {completedGoals.map((goal, index) => (
              <tr key={index} className="border-b border-neutral-700 last:border-0">
                <td className="px-6 py-4 text-gray-300">{goal.goalName}</td>
                <td className="px-6 py-4 text-green-400">{goal.stakedAmount}</td>
                <td className="px-6 py-4 text-blue-400">{goal.rewardAmount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${goal.achieved ? 'bg-green-600/20 text-green-400' : 'bg-red-600/20 text-red-400'}`}>
                    {goal.achieved ? 'Achieved' : 'Not Achieved'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
