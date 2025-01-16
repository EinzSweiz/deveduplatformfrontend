'use client'
import { motion, useAnimate, AnimationPlaybackControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
export default function CallToAction() {
    const [isHovered, setIsHovered] = useState(false)
    const animation = useRef<AnimationPlaybackControls | null>(null)
    const [scope, animate] = useAnimate()

    useEffect(() => {
        animation.current = animate( scope.current, {x: '-50%'}, {duration: 20, repeat: Infinity, ease: 'linear'})
    }, [])

    useEffect(() => {
        if (animation.current) {
            if (isHovered) {
                animation.current.speed = 0.5
            } else {
                animation.current.speed = 1
            }
        }
    }, [isHovered])
    return (
    <section className="pt-24 flex justify-center items-center">
        <div className="container flex justify-center overflow-x-clip p-4 cursor-pointer">
            <motion.div ref={scope} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {setIsHovered(false)}}
            className="flex flex-none gap-16 pr-16 text-7xl font-medium group">
                {Array.from({length: 10}).map((_, index) => (
                    <div key={index} className="flex items-center gap-16">
                    <span className="text-lime-400">&#10038;</span>
                    <span className='group-hover:text-lime-400'>Try it for free</span>
                </div>
                ))}
            </motion.div>
        </div>
    </section> 
    )
}