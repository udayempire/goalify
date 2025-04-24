"use client";

import Image from "next/image";
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

      {/* First Pair */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        {/* Left Card */}
        <div className="order-2 md:order-1">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 md:p-8 rounded-xl border border-gray-700">
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
                    <h4 className="text-lg font-semibold text-white">
                      {title}
                    </h4>
                    <p className="text-gray-300">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative order-1 md:order-2">
          <div className="rounded-xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1489676510480-72ff60f8bc03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Aerial view of snow covered area representing connections and pathways"
              width={1080}
              height={720}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/1080x720";
              }}
            />
            <div className="absolute bottom-4 left-4 bg-neutral-900/80 backdrop-blur-sm px-4 py-2 rounded text-sm text-white">
              Photo by Stephen Pedersen
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-4 rounded-xl shadow-xl transform -rotate-3">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-bold">Earn up to 30% extra</span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Pair */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        {/* Left Image */}
        <div className="relative">
          <div className="rounded-xl overflow-hidden shadow-2xl transform md:-rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1675703818188-cee153b831f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1080"
              alt="A tray with organized beads representing validation and organization"
              width={1080}
              height={720}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/1080x720";
              }}
            />
            <div className="absolute bottom-4 left-4 bg-neutral-900/80 backdrop-blur-sm px-4 py-2 rounded text-sm text-white">
              Photo by Julia Андрэй
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-purple-600 text-white p-4 rounded-xl shadow-xl transform rotate-3">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span className="font-bold">Fair validation system</span>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div>
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 md:p-8 rounded-xl border border-gray-700">
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
                    <h4 className="text-lg font-semibold text-white">
                      {title}
                    </h4>
                    <p className="text-gray-300">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Third Pair */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        {/* Left Card */}
        <div className="order-2 md:order-1">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 p-6 md:p-8 rounded-xl border border-gray-700">
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
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">
                      {title}
                    </h4>
                    <p className="text-gray-300">{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative order-1 md:order-2">
          <div className="rounded-xl overflow-hidden shadow-2xl transform md:rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1719399184280-89cfdecba587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1080"
              alt="A group of people in dark room representing anonymous validators"
              width={1080}
              height={720}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/1080x720";
              }}
            />
            <div className="absolute bottom-4 left-4 bg-neutral-900/80 backdrop-blur-sm px-4 py-2 rounded text-sm text-white">
              Photo by Neon Wang
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-4 rounded-xl shadow-xl transform -rotate-3">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <span className="font-bold">Secure & Transparent</span>
            </div>
          </div>
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
