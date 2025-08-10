"use client";

import React from "react";

type Card = { iconColor: string; title: string; description: string };

const featureCards: Card[] = [
  {
    iconColor: "blue-400",
    title: "Anti-Cheating System",
    description:
      "Validators can't see others' votes, preventing collusion and ensuring fair assessment.",
  },
  {
    iconColor: "purple-400",
    title: "Validator Rewards",
    description:
      "Honest validators earn tokens for accurate validation, increasing their future earning potential.",
  },
  {
    iconColor: "green-400",
    title: "Reputation System",
    description:
      "Validators build reputation through consistent, accurate validations, earning more validation opportunities.",
  },
];




export const ValidationProcess = () => (
  <section id="validation-process" className="py-20 bg-neutral-800 text-white">
    <div className="container mx-auto px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Decentralized Validation
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Our unique validation system ensures fairness and transparency while
          rewarding honest participants.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {featureCards.map(({ iconColor, title, description }) => (
          <div
            key={title}
            className="bg-neutral-700/30 p-6 rounded-xl border border-neutral-600 transform transition-transform hover:scale-105 duration-300"
          >
            <div
              className={`bg-${iconColor}/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6 mx-auto`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-8 w-8 text-${iconColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    title === "Anti-Cheating System"
                      ? "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      : title === "Validator Rewards"
                      ? "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      : "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  }
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center mb-3">{title}</h3>
            <p className="text-gray-300 text-center">{description}</p>
          </div>
        ))}
      </div>

      {/* Demo + Feedback + Benefits */}

    </div>
  </section>
);
