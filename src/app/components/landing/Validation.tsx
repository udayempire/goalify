"use client";

import React from "react";
import Image from "next/image";

type Step = { id: number; title: string; text: string };
type Card = { iconColor: string; title: string; description: string };
type Feedback = { type: "positive" | "negative"; message: string };
type Benefit = { title: string; text: string };

const validationSteps: Step[] = [
  {
    id: 1,
    title: "Submit Evidence",
    text: "Upload clear photo proof of your completed goal through the app.",
  },
  {
    id: 2,
    title: "Random Assignment",
    text: "Six validators are randomly selected to review your evidence.",
  },
  {
    id: 3,
    title: "Blind Voting",
    text: 'Validators vote "Yes" or "No" without seeing each other’s decisions.',
  },
  {
    id: 4,
    title: "Threshold Approval",
    text: 'Goal is validated if at least 4 out of 6 validators vote "Yes".',
  },
];

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

const feedbackList: Feedback[] = [
  {
    type: "positive",
    message: "Clear evidence of completed challenge. All requirements met.",
  },
  {
    type: "positive",
    message: "Great job! Evidence clearly shows all 30 days completed.",
  },
  {
    type: "negative",
    message: "Evidence doesn't clearly show days 20-25. Incomplete.",
  },
  {
    type: "positive",
    message: "Documentation is sufficient. Goal requirements fulfilled.",
  },
];

const benefits: Benefit[] = [
  {
    title: "Fair Assessment",
    text: "Multiple validators ensure impartial goal verification.",
  },
  {
    title: "Prevent Fraud",
    text: "Decentralized system prevents collusion and false validations.",
  },
  {
    title: "Earn While Validating",
    text: "Validators earn tokens for participating in the validation process.",
  },
  {
    title: "Build Reputation",
    text: "Accuracy increases your validator score and future opportunities.",
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

      {/* Steps + Image */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        {/* Steps */}
        <div>
          <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-8 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-6">How Validation Works</h3>
            <p className="text-gray-300 mb-6">
              Our decentralized validation ensures fair assessment of goal
              completion through a blind voting system.
            </p>
            <ul className="space-y-6">
              {validationSteps.map(({ id, title, text }) => (
                <li key={id} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold">
                    {id}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">{title}</h4>
                    <p className="text-gray-300">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Image with badges */}
        <div className="relative">
          <div className="bg-neutral-900/30 rounded-xl p-3 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1425421669292-0c3da3b8f529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Professional man in suit representing validation authority"
              width={1080}
              height={720}
              className="w-full h-auto rounded-lg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/1080x720";
              }}
            />
            <div className="absolute bottom-6 left-6 bg-neutral-800/80 backdrop-blur-sm px-4 py-2 rounded text-sm">
              Photo by Ben Rosett
            </div>
          </div>

          <div className="absolute -top-4 -right-4 bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transform rotate-3">
            <div className="font-bold">4/6 Validators Required</div>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transform -rotate-3">
            <div className="font-bold">100% Anonymous Voting</div>
          </div>
        </div>
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
      <div className="bg-neutral-900 rounded-xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
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
        <div className="relative z-10 grid md:grid-cols-2 gap-8">
          {/* Demo Log */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Validation Demo</h3>
            <div className="bg-neutral-800 p-6 rounded-lg shadow-lg mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="font-semibold">Goal Submission</div>
                <div className="text-sm text-gray-400">2 hours ago</div>
              </div>
              <div className="mb-4">
                <div className="font-medium mb-1">
                  Goal: Complete 30-day Fitness Challenge
                </div>
                <div className="text-sm text-gray-300">
                  User submitted photo evidence showing completed workout
                  program
                </div>
              </div>
              <div className="bg-neutral-700/50 p-3 rounded">
                <div className="text-sm font-medium mb-2">
                  Validation Status: In Progress
                </div>
                <div className="w-full bg-neutral-600 rounded-full h-2 mb-1">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "67%" }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>4/6 Votes Received</span>
                  <span>$150 Staked</span>
                </div>
              </div>
            </div>
            {/* Feedback */}
            <div className="bg-neutral-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">
                Validator Feedback (Anonymous)
              </h4>
              <div className="space-y-3">
                {feedbackList.map(({ type, message }, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 bg-neutral-700/30 p-3 rounded ${
                      type === "positive"
                        ? "border-l-4 border-green-500"
                        : "border-l-4 border-red-500"
                    }`}
                  >
                    <div
                      className={`text-white p-1 rounded ${
                        type === "positive" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d={
                            type === "positive"
                              ? "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              : "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          }
                        />
                      </svg>
                    </div>
                    <div className="text-sm">{message}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Benefits + CTA */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600/10 to-purple-600/10 p-6 rounded-xl border border-gray-700">
              <h4 className="text-xl font-bold mb-4">Validation Benefits</h4>
              <ul className="space-y-3">
                {benefits.map(({ title, text }) => (
                  <li key={title} className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      />
                    </svg>
                    <div>
                      <div className="font-medium">{title}</div>
                      <p className="text-sm text-gray-300">{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="text-center">
              <a
                href="#"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300"
              >
                Become a Validator
              </a>
              <p className="text-sm text-gray-400 mt-2">
                Start validating goals and earning rewards today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
