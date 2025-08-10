"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  // {
  //   name: "Dashboard",
  //   href: "/dashboard",
  //   key: "dashboard",
  //   icon: (
  //     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
  //       <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  //     </svg>
  //   ),
  // },
  {
    name: "My Goals",
    href: "/my-goals",
    key: "my-goals",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Validate Goals",
    href: "/validate-goals",
    key: "validate-goals",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Goal Groups",
    href: "/goal-groups",
    key: "goal-groups",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
      </svg>
    ),
  },
  {
    name: "Activity",
    href: "/activity",
    key: "wallets",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export const Sidebar = () => {
  // Added the missing state for the mobile menu
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("");

  // Update active tab based on the current route
  useEffect(() => {
    setActiveTab(pathname);
  }, [pathname]);

  // Styling function based on href
  const navLinkClass = (href:string) =>
    `flex items-center px-4 py-3 rounded-lg transition duration-200 ${
      activeTab === href
        ? "bg-gray-200 text-black"
        : "text-zinc-200 hover:text-black hover:bg-gray-200"
    }`;

  // Optional: handle tab click to update state manually
  const handleTabClick = (href:string) => {
    setActiveTab(href);
    console.log(`Navigating to: ${href}`);
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:block w-64 h-screen border-r border-neutral-200/20 dark:border-neutral-200/10 overflow-y-auto bg-gradient-to-r from-gray-950 to-black">
        <div className="px-6 py-4">
          <h1 className="text-xl font-bold text-zinc-200">GoalStake</h1>
        </div>
        <div className="px-4 py-2">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link href={item.href}>
                  <div
                    className={navLinkClass(item.href)}
                    onClick={() => handleTabClick(item.href)}
                  >
                    {item.icon}
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute bottom-0 w-64 border-t border-neutral-200/20 dark:border-neutral-200/10 p-4">
          <div className="flex items-center">
            <Image
              src="https://github.com/udayempire.png"
              className="w-8 h-8 rounded-full"
              alt="Profile"
              width={32}
              height={32}
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-zinc-200">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">24 Points</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="lg:hidden absolute top-4 left-4 z-50 p-2 rounded-md text-neutral-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        {!isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-0 z-40 bg-neutral-800/80 backdrop-blur-lg"
          onClick={() => setIsOpen(false)}
        >
          <div className="p-4 pt-16 h-screen overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="border-b border-neutral-200/10 pb-4 mb-4">
              <h1 className="text-xl font-bold text-white">GoalStake</h1>
            </div>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.key}>
                  <Link href={item.href}>
                    <a
                      className={navLinkClass(item.href)}
                      onClick={() => {
                        handleTabClick(item.href);
                        setIsOpen(false);
                      }}
                    >
                      {item.icon}
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-neutral-200/10 pt-4">
              <div className="flex items-center">
                <Image
                  src="https://avatar.iran.liara.run/public/boy"
                  className="w-8 h-8 rounded-full"
                  alt="Profile"
                  width={32}
                  height={32}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-400">24 Points</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
