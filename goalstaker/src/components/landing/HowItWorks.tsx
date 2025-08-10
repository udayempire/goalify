"use client";

import Image from "next/image";
import React from "react";

interface Step {
  id: number;
  title: string;
  description: string;
  color: "blue" | "purple";
}

const stepsLeft: Step[] = [
  {
    id: 1,
    title: "Set Your Goals",
    description:
      "Define clear, measurable goals with deadlines. Whether fitness, learning, or personal development — any goal works.",
    color: "blue",
  },
  {
    id: 2,
    title: "Stake Your Funds",
    description:
      "Put your money where your motivation is. Stake an amount that matters to you — enough to keep you committed.",
    color: "blue",
  },
  {
    id: 3,
    title: "Join or Create Groups",
    description:
      "Connect with like-minded individuals pursuing similar goals for extra accountability and motivation.",
    color: "blue",
  },
];

const stepsRight: Step[] = [
  {
    id: 4,
    title: "Submit Evidence",
    description:
      "Provide photo proof of your goal completion. Clear evidence ensures fair validation and verification.",
    color: "purple",
  },
  {
    id: 5,
    title: "Get Validated",
    description:
      "Random validators review your evidence. Four out of six validators must approve for successful validation.",
    color: "purple",
  },
  {
    id: 6,
    title: "Earn Rewards",
    description:
      "Succeed and get your stake back plus rewards from unsuccessful participants. Everyone wins when goals are achieved.",
    color: "purple",
  },
];

export const HowitWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-neutral-800 text-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How Goalify Works
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Set goals, stake funds, and earn rewards in a decentralized platform
            that keeps you accountable.
          </p>
        </div>

        {/* Two Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* First Card */}
          <div className="bg-neutral-700/30 rounded-xl p-8 relative overflow-hidden">
            <div className="bg-blue-600/10 rounded-full absolute -inset-4 blur-xl opacity-30" />
            <div className="space-y-8 relative z-10">
              {stepsLeft.map((step) => (
                <div key={step.id} className="flex gap-4 items-start">
                  <div
                    className={`flex-shrink-0 bg-${step.color}-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-white text-lg`}
                  >
                    {step.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Second Card */}
          <div className="bg-neutral-700/30 rounded-xl p-8 relative overflow-hidden">
            <div className="bg-purple-600/10 rounded-full absolute -inset-4 blur-xl opacity-30" />
            <div className="space-y-8 relative z-10">
              {stepsRight.map((step) => (
                <div key={step.id} className="flex gap-4 items-start">
                  <div
                    className={`flex-shrink-0 bg-${step.color}-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-white text-lg`}
                  >
                    {step.id}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flowchart & CTA */}
        <div className="mt-20">
          <div className="bg-neutral-700/30 rounded-xl p-8 relative overflow-hidden">
            {/* Decorative SVG */}
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-blue-500"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                />
              </svg>
            </div>

            <h3 className="text-2xl font-bold mb-6 relative z-10">
              The Validation Process Flowchart
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
              {[
                {
                  iconColor: "blue-600",
                  title: "Submit Evidence",
                  text: "Upload photo proof of your completed goal through the app",
                  svgPath:
                    "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
                },
                {
                  iconColor: "purple-600",
                  title: "Random Validation",
                  text: "Validators review evidence independently without seeing others' votes",
                  svgPath:
                    "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                },
                {
                  iconColor: "green-600",
                  title: "Majority Approval",
                  text: "Goal validated if majority validators approve",
                  svgPath:
                    "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
                },
              ].map(({ iconColor, title, text, svgPath }) => (
                <div
                  key={title}
                  className="bg-neutral-800 p-6 rounded-lg border border-neutral-700"
                >
                  <div
                    className={`bg-${iconColor} w-12 h-12 rounded-full flex items-center justify-center mb-4 mx-auto`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={svgPath}
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-center mb-2">
                    {title}
                  </h4>
                  <p className="text-gray-300 text-center text-sm">{text}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8 relative z-10">
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
              >
                Start Your First Goal
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
