'use client'
import Image from "next/image";
import Button from "../components/homepage/Button";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#features" },
    { label: "Integrations", href: "#integrations" },
    { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
        <section className="py-4 lg:py-8 flex justify-center fixed w-full top-0 z-50">
            <div className="container max-w-5xl">
                <div className="border border-white/15 rounded-[27px] bg-neutral-950/70 backdrop-blur">
                    <div className="grid grid-cols-2 lg:grid-cols-3 border border-white/15 rounded-full p-2 px-4 md:pr-2 items-center">
                        {/* Logo */}
                        <div>
                            <Image
                                src="/logo.png"
                                width={50}
                                height={50}
                                alt="logo image"
                                className="h-9 w-auto rounded-full"
                            />
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden lg:block justify-center items-center">
                            <nav className="flex justify-center gap-6">
                                {navLinks.map((link) => (
                                    <a
                                        href={link.href}
                                        key={link.label}
                                        className="text-white hover:text-lime-400 transition-colors duration-200"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Hamburger Menu and Buttons */}
                        <div className="flex justify-end gap-4 items-center">
                            {/* Hamburger Menu: Show only on small screens */}
                            <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="block md:hidden cursor-pointer"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.44772 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"
                                    fill="white"
                                />
                            </svg>

                            {/* Buttons: Show only on medium (md) and larger screens */}
                            {!isOpen && (
                                <>
                                    <Button variant="secondary" className="hidden md:block">
                                        Login
                                    </Button>
                                    <Button variant="primary" className="hidden md:block">
                                        Sign Up
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                    <AnimatePresence>
                    {isOpen && (
                        <motion.div 
                        initial={{height: 0}}
                        animate={{height: 'auto'}}
                        exit={{height: 0}}
                        className="overflow-hidden">
                            <div className="flex flex-col items-center gap-4 py-4 ">
                                {navLinks.map((link) => (
                                    <a href={link.href} key={link.label} className="py-2">
                                        {link.label}
                                    </a>
                                ))}
                                <div className="flex flex-cols justify-between gap-4">
                                    <Button variant="secondary">Login</Button>
                                    <Button variant="primary">Sign Up</Button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
        <div className="pb-[86px] md:pb-[98px] lg:pb-[130px]"></div>
        </>
    );
}
