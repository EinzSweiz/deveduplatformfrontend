'use client'
import Button from "../components/homepage/Button";
import Image from "next/image";
import Pointer from "../components/homepage/Pointer";
import { useAnimate, motion } from "framer-motion";
import { useEffect } from "react";

export default function Hero() {
    const [ leftDesignScope, leftDesignAnimate ] = useAnimate() 
    const [ leftPointerScope, leftPointerAnimate ] = useAnimate()
    const [ rightDesignScope, rightDesignAnimate ] = useAnimate() 
    const [ rightPointerScope, rightPointerAnimate ] = useAnimate()

    useEffect(() => {
        leftDesignAnimate([
            [leftDesignScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftDesignScope.current, { y: 0, x: 0 }, { duration: 0.5 }],
        ]);

        leftPointerAnimate([
            [leftPointerScope.current, { opacity: 1 }, { duration: 0.5 }],
            [leftPointerScope.current, { y: 0, x: -100 }, { duration: 0.5 }],
            [
                leftPointerScope.current,
                { x:0, y:[0, 16, 0] },
                { duration:0.5, ease: 'easeInOut'}
            ],
        ]);

        rightDesignAnimate([
            [rightDesignScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.5 }],
            [rightDesignScope.current, { y: 0, x: 0 }, { duration: 0.5, delay: 1.5 }],
        ]);

        rightPointerAnimate([
            [rightPointerScope.current, { opacity: 1 }, { duration: 0.5, delay: 1.5 }],
            [rightPointerScope.current, { y: 0, x: 175 }, { duration: 0.5, delay: 1.5 }],
            [
                rightPointerScope.current,
                { x:0, y:[16, 16, 16] },
                { duration:0.5, ease: 'easeInOut'}
            ],
        ]);
    }, [])

    return (
        <section className="relative flex justify-center py-24 overflow-x-clip">
            <div className="container relative">
                {/* Image on the Left */}
                <motion.div ref={leftDesignScope} drag initial={ {opacity: 0, y:100, x:-100} } className="hidden lg:block absolute -left-36 top-16 z-0 cursor-pointer">
                    <Image
                        src="/design-example-1.png"
                        width={400}
                        height={400}
                        alt="Design example image"
                        className="opacity-80"
                        draggable='false'
                    />
                </motion.div>
                <motion.div ref={leftPointerScope} initial={ {opacity:0, y:100, x:-200}} className="hidden lg:block absolute left-60 top-80">
                    <Pointer name="Tammy" color="blue"/>
                </motion.div>
                <motion.div ref={rightDesignScope} drag initial={ { opacity:0, y:100, x:100 }} className="hidden lg:block absolute -right-64 top-30 z-0 cursor-pointer">
                    <Image
                        src="/design-example-2.png"
                        width={400}
                        height={400}
                        alt="Design example image2"
                        className="opacity-80"
                        draggable='false'
                    />
                </motion.div>
                <motion.div ref={rightPointerScope} initial={ {opacity:0, y:100, x:275}} className="hidden lg:block absolute right-60 top-8">
                    <Pointer name="Nadir" color="red"/>
                </motion.div>
                {/* Content */}
                <div className="relative z-10">
                    {/* Announcement */}
                    <div className="flex justify-center">
                        <div className="inline-flex py-1 px-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full text-neutral-950 font-semibold">
                            🚀 7.5M seed round raised
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6">
                        Impactful design, created effortlessly
                    </h1>

                    {/* Description */}
                    <p className="text-center text-xl text-white/50 mt-8 px-6 lg:px-12 mx-auto">
                        Learn to code by building real projects.
                    </p>

                    {/* Form */}
                    <form
                        action="f"
                        className="flex items-center border border-white/15 rounded-full p-2 mt-8 max-w-lg mx-auto space-x-4"
                    >
                        {/* Email Input */}
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent flex-1 px-4 py-2 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 rounded-full"
                        />
                        
                        {/* Submit Button */}
                        <Button
                            type="submit"
                            variant="primary"
                            className="whitespace-nowrap px-6 py-2"
                            size="sm"
                        >
                            Sign Up
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
