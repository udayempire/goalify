"use client";

import React from "react";

type FeatureItem = {
  title: string;
  description: string;
  iconColor: "blue-600" | "purple-600" | "green-600";
};

const featuresGroupA: FeatureItem[] = [
  {
    title: "Stake Any Amount",
    description:
      "Choose a stake amount that motivates you to stay committed to your goals.",
    iconColor: "blue-600",
  },
  {
    title: "Complete & Earn",
    description:
      "Achieve your goal to receive your stake back plus a share of non-completers’ stakes.",
    iconColor: "blue-600",
  },
  {
    title: "Group Challenges",
    description:
      "Join or create groups with similar goals for increased accountability and motivation.",
    iconColor: "blue-600",
  },
];

const featuresGroupB: FeatureItem[] = [
  {
    title: "Random Validators",
    description:
      "Six impartial validators review your goal completion evidence independently.",
    iconColor: "purple-600",
  },
  {
    title: "Photo Evidence",
    description:
      "Submit clear visual proof of your completed goal for validator review.",
    iconColor: "purple-600",
  },
  {
    title: "Validator Rewards",
    description:
      "Validators earn tokens for accurate validation, increasing future opportunities.",
    iconColor: "purple-600",
  },
];

const featuresGroupC: FeatureItem[] = [
  {
    title: "Blind Voting",
    description:
      "Validators cannot see each other’s votes, preventing collusion.",
    iconColor: "green-600",
  },
  {
    title: "Reputation System",
    description:
      "Malicious voting diminishes future validation opportunities and rewards.",
    iconColor: "green-600",
  },
  {
    title: "Threshold Approval",
    description:
      "4/6 majority requirement ensures fair and accurate validation.",
    iconColor: "green-600",
  },
];

export const Features = () => (
  <section id="features" className="py-20 bg-neutral-900">
    <div className="container mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Key Platform Features
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Our decentralized goal-staking platform offers powerful features to
          help you achieve your goals and earn rewards.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch mb-24">
        {/* Goal Achievement Card */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 md:p-8 rounded-xl border border-gray-700 h-full">
          <h3 className="text-2xl font-bold text-white mb-6">
            Goal Achievement with Rewards
          </h3>
          <ul className="space-y-4">
            {featuresGroupA.map(({ title, description, iconColor }) => (
              <li key={title} className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 bg-${iconColor} rounded-full flex items-center justify-center mt-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{title}</h4>
                  <p className="text-gray-300">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Decentralized Validation Card */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 md:p-8 rounded-xl border border-gray-700 h-full">
          <h3 className="text-2xl font-bold text-white mb-6">
            Decentralized Validation
          </h3>
          <ul className="space-y-4">
            {featuresGroupB.map(({ title, description, iconColor }) => (
              <li key={title} className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 bg-${iconColor} rounded-full flex items-center justify-center mt-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{title}</h4>
                  <p className="text-gray-300">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Anti-Cheating Mechanisms Card */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 md:p-8 rounded-xl border border-gray-700 h-full">
          <h3 className="text-2xl font-bold text-white mb-6">
            Anti-Cheating Mechanisms
          </h3>
          <ul className="space-y-4">
            {featuresGroupC.map(({ title, description, iconColor }) => (
              <li key={title} className="flex items-start gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 bg-${iconColor} rounded-full flex items-center justify-center mt-1`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7-293a1 1 0 011.414 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{title}</h4>
                  <p className="text-gray-300">{description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <a
          href="#"
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Start Staking Your Goals Today
        </a>
      </div>
    </div>
  </section>
);
