import Tag from "../components/homepage/Tag";
import Image from "next/image";
import IntegrationColumn from "../components/homepage/IntegrationColumn";
const integrations = [
    { name: "Figma", icon: "/figma-logo.svg", description: "Figma is a collaborative interface design tool." },
    { name: "Notion", icon: "/notion-logo.svg", description: "Notion is an all-in-one workspace for notes and docs." },
    { name: "Slack", icon: "/slack-logo.svg", description: "Slack is a powerful team communication platform." },
    { name: "Relume", icon: "/relume-logo.svg", description: "Relume is a no-code website builder and design system." },
    { name: "Framer", icon: "/framer-logo.svg", description: "Framer is a professional website prototyping tool." },
    { name: "GitHub", icon: "/github-logo.svg", description: "GitHub is the leading platform for code collaboration." },
];

export type IntegrationsType = typeof integrations

export default function Integrations() {
    return (
        <section className="py-24 overflow-hidden">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="grid lg:grid-cols-2 lg:items-center lg:gap-16">
                    {/* Left Column */}
                    <div className="flex flex-col items-center justify-center lg:items-start">
                        <Tag>Integrations</Tag>
                        <h2 className="text-6xl font-medium mt-6 text-center lg:text-left">
                            Plays well with <span className="text-lime-400">others</span>
                        </h2>
                        <p className="text-white/50 mt-4 text-lg px-4 text-center lg:text-left">
                            Layers seamlessly connects with your favorite tool, making it easy to plug into any
                            workflow and collaborate across platforms.
                        </p>
                    </div>

                    {/* Right Column */}
                    <div className="h-[400px] lg:h-[800px] mt-8 lg:mt-0 overflow-hidden gap-4 grid md:grid-cols-2 justify-center items-start [mask-image:linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)]">
                        <IntegrationColumn integrations={integrations} />
                        <IntegrationColumn reverse={true} integrations={integrations.slice().reverse()} className="hidden md:flex" />
                    </div>
                </div>
            </div>
        </section>
    );
}
