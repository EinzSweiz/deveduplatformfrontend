import Image from "next/image";

const footerLinks = [
    { href: "#", label: "Contact" },
    { href: "#", label: "Privacy Policy" },
    { href: "#", label: "Terms & Conditions" },
];

export default function Footer() {
    return (
        <footer className="py-16">
            <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between">
                {/* Logo Section */}
                <div className="flex items-center mb-6 md:mb-0">
                    <Image src="/logo.png" alt="logo" width={75} height={75} />
                    <span className="ml-4 text-white text-lg font-semibold">
                        CoursesIT
                    </span>
                </div>

                {/* Links Section */}
                <nav className="flex gap-6">
                    {footerLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-white/70 hover:text-white transition"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
