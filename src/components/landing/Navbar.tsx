"use client"
import { useState } from "react";
import Link from "next/link";
import React from "react";



export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    const navLinks = [
        { href: "#", label: "Home" },
        { href: "#how-it-works", label: "How It Works" },
        { href: "#features", label: "Features" },
        { href: "#validation-process", label: "Validation" },
        { href: "#rewards-system", label: "Rewards" },
        // { href: "#testimonials", label: "Testimonials" },
        // { href: "#community", label: "Community" },
        // { href: "#faq", label: "FAQ" },
    ];


    return (
        <nav className="bg-neutral-900 text-white py-4 px-6 w-full fixed top-0 z-50">
            <div className="container mx-auto">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-xl font-bold">
                        <Link href="/" className="text-white hover:text-blue-400 transition-colors duration-300">
                            Goalify
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="text-white hover:text-blue-400 transition-colors duration-300">
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Link href="http://localhost:3000/goal-groups" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors duration-300">
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="lg:hidden text-white focus:outline-none" onClick={toggleMenu} aria-label="Toggle navigation menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <div className="lg:hidden mt-4 transition-all duration-300" id="mobile-menu">
                        <div className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="text-white hover:text-primary transition-colors duration-300">
                                    {link.label}
                                </Link>
                            ))}
                            <Link href="http://localhost:3000/goal-groups" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full text-center transition-colors duration-300">
                                Get Started
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )

}