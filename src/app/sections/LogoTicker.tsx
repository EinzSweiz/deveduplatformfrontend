'use client'
import Image from "next/image"
import React from "react"
import { useAnimate, motion } from "framer-motion";

const logos = [
    { name: 'Quantum', image: '/quantum.svg'},
    { name: 'Acme Corp', image: '/acme-corp.svg'},
    { name: 'Echo Valley', image: '/echo-valley.svg'},
    { name: 'Pulse', image: '/pulse.svg'},
    { name: 'Outside', image: '/outside.svg'},
    { name: 'Apex', image: '/apex.svg'},
    { name: 'Celestial', image: '/celestial.svg'},
    { name: 'Twice', image: '/twice.svg'},
]
  
export default function LogoTicker() { 
    return <section className="flex justify-center py-24 overflow-x-clip">
        <div className="container">
            <h3 className="text-center text-xl text-white/50">Already chosen by these market leaders</h3>
            <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div 
                animate={{ x:'-50%' }} 
                transition={{ duration:30, ease: 'linear', repeat: Infinity, }} 
                className="flex flex-none gap-24 py-12 pr-24 justify-center">
                    {Array.from({length: 2}).map((_, i) => (
                        <React.Fragment key={i}>
                            {logos.map(logo => (
                                <Image src={logo.image} alt={logo.name} key={logo.name} width={100} height={100}/>
                            ))}
                        </React.Fragment>
                    ))}
                </motion.div>
            </div>
        </div>
    </section>
}