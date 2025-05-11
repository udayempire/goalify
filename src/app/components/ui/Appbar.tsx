"use client";
export const Appbar = () => {
  return (
    <nav className="bg-gradient-to-r from-bg-black to-bg-gray-200 ">
      <div className="max-w-7xl mx-auto ">
        <div className="flex justify-between h-16">
          {/* Left side - Dashboard name */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-zinc-200">Dashboard</h1>
          </div>
          {/* Right side - Connect Wallet button */}
          <div className="flex items-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              onClick={() => {
                // Add wallet connection logic here
                console.log("Connect wallet clicked"); 
              }}
            >
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
