import Image from "next/image";
export const Herosection = () => {
  return (
    <div>
      <section >
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40 ">
          <Image
            src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2MzQ2fDB8MXxzZWFyY2h8MXx8bWFpbiUyMHZpZXclMjBmZWF0dXJlZCUyMGltYWdlJTIwcHJvZmVzc2lvbmFsJTIwaGlnaCUyMHF1YWxpdHklMjBmZWF0dXJlZHxlbnwwfDB8fHwxNzQzMTU5NDUyfDA&ixlib=rb-4.0.3&q=80&w=1080"
            alt="Person standing near stairs, representing achievement"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90" />
        <div className="container mx-auto px-6 relative z-10 ">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="md:pr-12 space-y-8 ">
              <h1 className="text-4xl text-zinc-200 md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block mb-2">Stake Your Goals.</span>
                <span className="block mb-2">Earn Your Rewards.</span>
                <span className="block text-blue-400">Validate Fairly.</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 max-w-xl">
                Transform your commitments into achievements with our
                decentralized goal-staking platform. Set goals, stake funds, and
                earn rewards.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="http://localhost:3000/goal-groups"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 text-center"
                >
                  Start Staking
                </a>
                <a
                  href="https://x.com/Goalify_"
                  className="bg-transparent border border-white hover:bg-white/10 text-white font-medium py-3 px-8 rounded-full transition-colors duration-300 text-center"
                >
                  Follow on X
                </a>
              </div>
            </div>

            {/* Dashboard Card */}
            <div className="relative">
              <div className="bg-neutral-800/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-700 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-200">Goal Dashboard</h3>
                    <p className="text-gray-400">Track your progress</p>
                  </div>
                  <div className="bg-blue-600 text-white p-2 rounded-lg text-sm font-bold">
                    3 of 5 Validators Approved
                  </div>
                </div>

                {/* Goal List */}
                <div className="space-y-4 mb-6 text-zinc-200">
                  {/* Goal Item 1 */}
                  <div className="bg-neutral-700/50 p-4 rounded-lg text-zinc-200">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Daily Workout</span>
                      <span className="text-green-400">$120 Staked</span>
                    </div>
                    <div className="w-full bg-neutral-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "75%" }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>Day 15 of 20</span>
                      <span className="text-blue-400">75% Complete</span>
                    </div>
                  </div>

                  {/* Goal Item 2 */}
                  <div className="bg-neutral-700/50 p-4 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Learn Spanish</span>
                      <span className="text-green-400">$250 Staked</span>
                    </div>
                    <div className="w-full bg-neutral-600 rounded-full h-2">
                      <div
                        className="bg-purple-500 h-2 rounded-full"
                        style={{ width: "40%" }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span>Week 4 of 10</span>
                      <span className="text-purple-400">40% Complete</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Potential reward:{" "}
                    <span className="text-green-400 font-bold">$180</span>
                  </div>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                  >
                    View All Goals →
                  </a>
                </div>
              </div>

              {/* Pulse Badge */}
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg animate-pulse">
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
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 flex justify-center text-center py-4 text-xl font-semibold text-zinc-200">
            You Achieve your goals and we will reward you !
          </div>
        </div>

        {/* Bottom SVG Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-auto"
          >
            <path
              fill="#111827"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};
