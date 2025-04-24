"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type NavLink = { href: string; label: string };

const platformLinks: NavLink[] = [
  { href: "#HowItWorks", label: "How It Works" },
  { href: "#features", label: "Features" },
  { href: "#Validation", label: "Validation Process" },
  { href: "#Rewards", label: "Reward System" },
];

const resourcesLinks: NavLink[] = [
  { href: "/", label: "Blog" },
  { href: "/", label: "Guides" },
  { href: "/", label: "API Documentation" },
  { href: "/", label: "FAQ" },
  { href: "/", label: "Help Center" },
];

const companyLinks: NavLink[] = [
  { href: "/", label: "About Us" },
  { href: "/", label: "Careers" },
  { href: "/", label: "Privacy Policy" },
  { href: "/", label: "Terms of Service" },
  { href: "/", label: "Contact Us" },
];

export const Footer = () => (
  <footer id="footer" className="bg-neutral-900 text-white pt-16 pb-8">
    <div className="container mx-auto px-6">
      {/* Top Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Brand & Social */}
        <div>
          <Link href="/" className="text-2xl font-bold mb-6 inline-block">
            GoalStaker
          </Link>
          <p className="text-gray-400 mb-6">
            Achieve your goals with financial incentives and community
            accountability.
          </p>
          <div className="flex space-x-4">
            {/* Facebook */}
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                />
              </svg>
            </Link>
            {/* Twitter */}
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675…" />
              </svg>
            </Link>
            {/* Instagram */}
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.315 2c2.43 0 2.784…"
                />
              </svg>
            </Link>
            {/* GitHub */}
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017…"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Navigation Groups */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Platform</h3>
          <ul className="space-y-3">
            {platformLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Resources</h3>
          <ul className="space-y-3">
            {resourcesLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-3">
            {companyLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Middle Section */}
      <div className="border-t border-neutral-800 pt-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Brand Mini */}
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src="https://images.unsplash.com/photo-1531265726475-52ad60219627?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.0.3&q=80&w=1080"
              alt="GoalStaker logo"
              width={100}
              height={60}
              className="h-16 w-auto rounded object-cover mr-4"
            />
            <div>
              <div className="text-lg font-bold">GoalStaker</div>
              <div className="text-sm text-gray-400">
                Transform Your Goals Into Achievements
              </div>
            </div>
          </div>

          {/* Call-to-Action */}
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-end gap-4">
            <div className="text-center md:text-right">
              <div className="text-lg font-bold">Ready to get started?</div>
              <div className="text-sm text-gray-400 mb-3">
                Sign up today and start staking your goals!
              </div>
            </div>
            <Link
              href="/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-gray-400 text-sm mb-4 md:mb-0">
          © 2023 GoalStaker. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <Link
            href="/privacy"
            className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
          >
            Terms of Service
          </Link>
          <Link
            href="/cookies"
            className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
          >
            Cookie Policy
          </Link>
        </div>
      </div>

      {/* Attribution */}
      <div className="mt-8 text-center text-xs text-gray-500">
        Images by{" "}
        <a
          href="https://unsplash.com/@williamdaigneault"
          className="text-gray-400 hover:text-white"
        >
          William Daigneault
        </a>{" "}
        on Unsplash
      </div>
    </div>
  </footer>
);
