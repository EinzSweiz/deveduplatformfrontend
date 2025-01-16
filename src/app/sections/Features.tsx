import Tag from "../components/homepage/Tag";
import FeatureCard from "../components/homepage/FeatureCard";
import Image from "next/image";
import Avatar from "../components/homepage/Avatar";
import Key from "../components/homepage/Key";
import { motion } from 'framer-motion'

const features = [
    "Asset Library",
    "Code Preview",
    "Flow Mode",
    "Smart Sync",
    "Auto Layout",
    "Fast Search",
    "Smart Guides",
];

export default function Features() {
    return (
        <section className="flex justify-center py-24">
            <div className="container">
                {/* Tag */}
                <div className="flex justify-center">
                    <Tag>Features</Tag>
                </div>

                {/* Title */}
                <h2 className="text-6xl font-medium text-center mt-6">
                    Where power meets <span className="text-lime-400">simplicity</span>
                </h2>

                {/* Grid Layout */}
                <div className="mt-12 gap-8 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3">
                    {/* Card 1 */}
                    <FeatureCard
                        title="Real-time Collaboration"
                        description="Work together seamlessly with conflict-free team editing"
                        className="md:col-span-2 lg:col-span-1 group"
                    >
                        <div className="aspect-video flex items-center justify-center">
                            <Avatar className="z-40">
                                <Image
                                    src="/avatar-ashwin-santiago.jpg"
                                    alt="avatar-ashwin-santiago"
                                    width={70}
                                    height={60}
                                    className="rounded-full"
                                />
                            </Avatar>
                            <Avatar className="-ml-6 border-indigo-500 z-30">
                                <Image
                                    src="/avatar-florence-shaw.jpg"
                                    alt="avatar-florence-shaw"
                                    width={70}
                                    height={60}
                                    className="rounded-full"
                                />
                            </Avatar>
                            <Avatar className="-ml-6 border-amber-500 z-20">
                                <Image
                                    src="/avatar-lula-meyers.jpg"
                                    alt="avatar-lula-meyers"
                                    width={70}
                                    height={60}
                                    className="rounded-full"
                                />
                            </Avatar>
                            <Avatar className="-ml-6 border-transparent group-hover:border-green-500 transition">
                                <div className="bg-neutral-700 size-full rounded-full inline-flex items-center justify-center gap-1 relative">
                                    <Image 
                                    src='/avatar-owen-garcia.jpg' 
                                    alt="avatar-owen-garcia" width={70} height={60} 
                                    className="rounded-full size-full absolute opacity-0 group-hover:opacity-100 transition" />
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <span
                                            className="size-1.5 rounded-full bg-white inline-flex"
                                            key={i}
                                        ></span>
                                    ))}
                                </div>
                            </Avatar>
                        </div>
                    </FeatureCard>

                    {/* Card 2 */}
                    <FeatureCard
                        title="Interactive Prototyping"
                        description="Engage your clients with prototypes that react to user actions"
                        className="md:col-span-2 lg:col-span-1 group"
                    >
                        <div className="flex aspect-video justify-center items-center">
                            <p className="text-4xl font-extrabold text-white/20 group-hover:text-white/10 transition duration-500 text-center">
                                We've achieved <br />
                                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent relative">
                                    <span>incredible</span>
                                    <video src="/gif-incredible.mp4" 
                                    autoPlay 
                                    loop 
                                    muted 
                                    playsInline className="absolute bottom-full left-1/2 -translate-x-1/2 rounded-2xl shadow-xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"
                                    />
                                </span>
                                <br />
                                growth this year
                            </p>
                        </div>
                    </FeatureCard>

                    {/* Card 3 */}
                    <FeatureCard
                        title="Keyboard Quick Actions"
                        description="Powerful commands to help you create designs more quickly"
                        className="md:col-span-4 md:col-start-1 lg:col-span-1 lg:col-start-auto group"
                    >
                        <div className="aspect-video flex justify-center items-center gap-4">
                            <Key className="w-28 outline outline-2 outline-transparent outline-offset-4 group-hover:outline-lime-400 transition-all duration-500 group-hover:translate-y-1">shift</Key>
                            <Key className="outline outline-2 outline-transparent outline-offset-4 group-hover:outline-lime-400 transition-all duration-500 group-hover:translate-y-1 delay-150">alt</Key>
                            <Key className="outline outline-2 outline-transparent outline-offset-4 group-hover:outline-lime-400 transition-all duration-500 group-hover:translate-y-1 delay-300">C</Key>
                        </div>
                    </FeatureCard>
                </div>

                {/* Features List */}
                <div className="mt-8 flex flex-wrap gap-3 justify-center">
                    {features.map((feature) => (
                        <div
                            key={feature}
                            className="bg-neutral-900 border border-white/10 inline-flex px-3 py-1.5 rounded-2xl gap-3 items-center hover:scale-110 transition duration-500 group" 
                        >
                            <span className="bg-lime-400 text-neutral-950 size-5 rounded-full items-center justify-center inline-flex text-xl group-hover:rotate-90 transition duration-500">
                                &#10038;
                            </span>
                            <span className="font-medium">{feature}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
