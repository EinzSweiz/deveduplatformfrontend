'use client'
import Tag from "../components/homepage/Tag";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { motion, AnimatePresence } from 'framer-motion'


const faqs = [
    {
        question: "How is Layers different from other design tools?",
        answer: "Unlike traditional design tools, Layers prioritizes speed and simplicity without sacrificing power. Our intelligent interface adapts to your workflow, reducing clicks and keeping you in your creative flow.",
    },
    {
        question: "Is there a learning curve?",
        answer: "Layers is designed to feel intuitive from day one. Most designers are productive within hours, not weeks. We also provide interactive tutorials and comprehensive documentation to help you get started.",
    },
    {
        question: "How do you handle version control?",
        answer: "Every change in Layers is automatically saved and versioned. You can review history, restore previous versions, and create named versions for important milestones.",
    },
    {
        question: "Can I work offline?",
        answer: "Yes! Layers includes a robust offline mode. Changes sync automatically when you're back online, so you can keep working anywhere.",
    },
    {
        question: "How does Layers handle collaboration?",
        answer: "Layers is built for collaboration. You can invite team members to your projects, share feedback, and work together in real-time.",
    },
];

export default function Faqs() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleFaq = (index:number) => {
       setOpenIndex(openIndex === index ? null : index)
    }
    return (
        <section className="py-24 flex justify-center items-center">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="flex justify-center">
                    <Tag>FAQS</Tag>
                </div>
                <h2 className="text-6xl font-medium mt-6 text-center max-w-xl mx-auto">
                    Questions? We've got <span className="text-lime-400">answers</span>
                </h2>
                <div className="mt-12 flex flex-col gap-6 max-w-xl mx-auto">
                    {faqs.map((faq, index) => (
                        <div key={index } className="bg-neutral-900 rounded-2xl border border-white/10 p-6">
                            <div className="flex justify-between items-center">
                                <h3 className="font-medium text-lg">{faq.question}</h3>
                                <button onClick={() => toggleFaq(index)}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={twMerge("text-lime-400 flex-shrink-0 transition-transform duration-200", openIndex == index && 'rotate-45')}
                                    >
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                            </div>
                            <AnimatePresence>
                            { openIndex === index && 
                                <motion.div initial={
                                    {
                                        height: 0,
                                        marginTop:0
                                    }
                                } animate={
                                    {
                                        height: 'auto',
                                        marginTop: 24
                                    }
                                } exit={
                                    {
                                        height: 0,
                                        marginTop: 0
                                    }
                                } className="overflow-hidden">
                                    <p className="mt-4 text-white/50 text-sm">{faq.answer}</p>
                                </motion.div>
                            }
                            </AnimatePresence>   
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}