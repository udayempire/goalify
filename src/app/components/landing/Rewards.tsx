"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Step {
  id: number;
  title: string;
  description: string;
  color: "blue" | "purple";
}

interface Card {
  iconColor: "blue" | "purple" | "green";
  title: string;
  text: string;
}

const achieverSteps: Step[] = [
  {
    id: 1,
    title: "Stake Return",
    description:
      "Get 100% of your staked amount back upon successful goal completion.",
    color: "blue",
  },
  {
    id: 2,
    title: "Bonus Rewards",
    description:
      "Earn additional rewards from the pool of unsuccessful participants' stakes.",
    color: "blue",
  },
  {
    id: 3,
    title: "Achievement Tokens",
    description:
      "Collect tokens that increase future rewards and provide special platform benefits.",
    color: "blue",
  },
];

const validatorSteps: Step[] = [
  {
    id: 1,
    title: "Validation Tokens",
    description:
      "Earn tokens for every validation you complete, regardless of the outcome.",
    color: "purple",
  },
  {
    id: 2,
    title: "Accuracy Bonuses",
    description:
      "Receive bonus rewards when your validation aligns with the majority consensus.",
    color: "purple",
  },
  {
    id: 3,
    title: "Reputation Growth",
    description:
      "Build reputation that increases your validation opportunities and reward percentages.",
    color: "purple",
  },
];

const summaryCards: Card[] = [
  {
    iconColor: "blue",
    title: "Reward Distribution",
    text: "70% of failed participants' stakes are distributed to successful achievers.",
  },
  {
    iconColor: "purple",
    title: "Validator Share",
    text: "20% of failed stakes go to accurate validators as incentive for honest verification.",
  },
  {
    iconColor: "green",
    title: "Community Fund",
    text: "10% supports platform operations and community-decided feature developments.",
  },
];

export const RewardsSystem= () => {
  // Calculator state
  const [stake, setStake] = useState(100);
  const [groupSize, setGroupSize] = useState(10);
  const [successRate, setSuccessRate] = useState(60);

  // Derived outputs
  const [individualReward, setIndividualReward] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [percentageReturn, setPercentageReturn] = useState(0);

  useEffect(() => {
    // whenever inputs change, recalc
    const failedCount = Math.round(groupSize * (1 - successRate / 100));
    const failedStake = failedCount * stake;
    const successful = groupSize - failedCount;
    const pool = failedStake * 0.7;
    const reward = successful > 0 ? Math.round(pool / successful) : 0;

    setIndividualReward(reward);
    setTotalEarnings(stake + reward);
    setPercentageReturn(stake > 0 ? Math.round((reward / stake) * 100) : 0);
  }, [stake, groupSize, successRate]);

  return (
    <section id="rewards-system" className="py-20 bg-neutral-900 text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Rewarding Goal Achievement
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Our unique incentive structure ensures everyone benefits from
            completing goals and validating honestly.
          </p>
        </div>

        {/* Achiever vs Image */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Image + badges */}
          <div className="relative order-2 md:order-1">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-3 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8cmV3YXJkcy1zeXN0ZW0lMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzUyNjQxM3ww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Person climbing stairs symbolizing achievement and rewards"
                width={1080}
                height={720}
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/1080x720";
                }}
              />
              <div className="absolute bottom-6 left-6 bg-neutral-900/80 backdrop-blur-sm px-4 py-2 rounded text-sm">
                Photo by Hunters Race
              </div>
            </div>
            <div className="absolute -top-4 -right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform rotate-3">
              <div className="font-bold">30% Extra Earnings</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform -rotate-3">
              <div className="font-bold">100% Stake Return</div>
            </div>
          </div>

          {/* Achiever steps */}
          <div className="order-1 md:order-2">
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Goal Achiever Rewards</h3>
              <p className="text-gray-300 mb-6">
                When you complete your goals, you don&apos;t just get your stake
                back&nbsp;— you earn additional rewards.
              </p>
              <ul className="space-y-6">
                {achieverSteps.map(({ id, title, description, color }) => (
                  <li key={id} className="flex gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 bg-${color}-600 rounded-full flex items-center justify-center font-bold`}
                    >
                      {id}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{title}</h4>
                      <p className="text-gray-300">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Validator vs Image */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Validator steps */}
          <div>
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-xl border border-gray-700">
              <h3 className="text-2xl font-bold mb-6">Validator Rewards</h3>
              <p className="text-gray-300 mb-6">
                Honest validators are essential to our platform and are rewarded
                for their accurate assessments.
              </p>
              <ul className="space-y-6">
                {validatorSteps.map(({ id, title, description, color }) => (
                  <li key={id} className="flex gap-4">
                    <div
                      className={`flex-shrink-0 w-10 h-10 bg-${color}-600 rounded-full flex items-center justify-center font-bold`}
                    >
                      {id}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1">{title}</h4>
                      <p className="text-gray-300">{description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Image + badges */}
          <div className="relative">
            <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-3 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8M3x8cmV3YXJkcy1zeXN0ZW0lMjBwcm9mZXNzaW9uYWx8ZW58MHwwfHx8MTc0MzUyNjQxM3ww&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Professional man in suit symbolizing success in validation system"
                width={1080}
                height={720}
                className="w-full h-auto rounded-lg"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    "https://placehold.co/1080x720";
                }}
              />
              <div className="absolute bottom-6 left-6 bg-neutral-900/80 backdrop-blur-sm px-4 py-2 rounded text-sm">
                Photo by Ben Rosett
              </div>
            </div>
            <div className="absolute -top-4 -left-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transform -rotate-3">
              <div className="font-bold">Earn While Validating</div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg transform rotate-3">
              <div className="font-bold">Reputation Boosts</div>
            </div>
          </div>
        </div>

        {/* Summary cards */}
        <div className="bg-neutral-800 rounded-xl p-8 relative overflow-hidden mb-20">
          <div className="grid md:grid-cols-3 gap-8">
            {summaryCards.map(({ iconColor, title, text }) => (
              <div
                key={title}
                className="bg-neutral-700/30 p-6 rounded-xl border border-neutral-600 transform transition-transform hover:scale-105 duration-300"
              >
                <div
                  className={`bg-${iconColor}-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-8 w-8 text-${iconColor}-400`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {/* pick icon based on title */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={
                        title === "Reward Distribution"
                          ? "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          : title === "Validator Share"
                          ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622"
                          : "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5"
                      }
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-center mb-3">{title}</h3>
                <p className="text-gray-300 text-center">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Calculator */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Inputs */}
              <div>
                <h3 className="text-2xl font-bold mb-4">Rewards Calculator</h3>
                <p className="text-gray-300 mb-6">
                  See how much you could earn by achieving your goals with our
                  platform.
                </p>
                <div className="space-y-4">
                  {/* Stake */}
                  <div>
                    <label
                      htmlFor="stake"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Your Stake Amount ($)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        $
                      </span>
                      <input
                        id="stake"
                        type="number"
                        min={10}
                        max={1000}
                        value={stake}
                        onChange={(e) => setStake(Number(e.target.value))}
                        className="block w-full bg-neutral-800 border border-gray-600 rounded-lg py-2 pl-8 pr-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Group size */}
                  <div>
                    <label
                      htmlFor="group"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Group Size
                    </label>
                    <select
                      id="group"
                      value={groupSize}
                      onChange={(e) => setGroupSize(Number(e.target.value))}
                      className="block w-full bg-neutral-800 border border-gray-600 rounded-lg py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {[5, 10, 20, 50].map((n) => (
                        <option key={n} value={n}>
                          {n} people
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Success rate */}
                  <div>
                    <label
                      htmlFor="success"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Estimated Success Rate (%)
                    </label>
                    <input
                      id="success"
                      type="range"
                      min={30}
                      max={90}
                      value={successRate}
                      onChange={(e) => setSuccessRate(Number(e.target.value))}
                      className="w-full h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>30%</span>
                      <span>{successRate}%</span>
                      <span>90%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-neutral-800 p-6 rounded-xl border border-neutral-700">
                <h4 className="text-lg font-bold mb-4 text-center">
                  Your Potential Rewards
                </h4>
                <div className="space-y-4">
                  {/* Initial Stake */}
                  <div className="bg-neutral-700/50 p-4 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Initial Stake:</span>
                      <span className="font-bold text-white">${stake}</span>
                    </div>
                    <div className="w-full bg-neutral-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${percentageReturn}%` }}
                      />
                    </div>
                  </div>

                  {/* Reward Share */}
                  <div className="bg-neutral-700/50 p-4 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300">Reward Share:</span>
                      <span className="font-bold text-green-400">
                        + ${individualReward}
                      </span>
                    </div>
                    <div className="w-full bg-neutral-600 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${percentageReturn}%` }}
                      />
                    </div>
                  </div>

 
                  {/* Total */}
                  <div className="border-t border-gray-600 pt-4 mt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg text-gray-300">
                        Total Earnings:
                      </span>
                      <span className="text-xl font-bold text-white">
                        ${totalEarnings}
                      </span>
                    </div>
                    <div className="text-green-400 text-sm text-right">
                      +{percentageReturn}% return
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 text-center">
                    <a
                      href="#"
                      className="inline-block bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-medium py-2 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      Start Earning Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
