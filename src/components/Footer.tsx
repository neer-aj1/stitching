import {
    brandName,
    brandStatement,
    contactEmail,
    instagramUrl,
} from "../data/site";

const workLinks = [
    { label: "Featured Work", href: "#work" },
    { label: "Handkerchiefs", href: "#categories" },
    { label: "T-Shirts", href: "#categories" },
    { label: "Fabric Art", href: "#categories" },
];

const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Custom Orders", href: "#custom" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
];

export function Footer() {
    return (
        <footer id="contact" className="bg-charcoal text-ivory">
            <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
                    <div className="md:col-span-5">
                        <a
                            href="#top"
                            className="font-serif text-2xl font-medium text-ivory"
                        >
                            {brandName}
                        </a>
                        <p className="mt-4 max-w-xs text-sm font-light leading-relaxed text-ivory/70">
                            {brandStatement}
                        </p>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-ivory/50">
                            Work
                        </h4>
                        <ul className="space-y-3">
                            {workLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm font-light text-ivory/80 transition-colors hover:text-ivory"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-ivory/50">
                            Studio
                        </h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-sm font-light text-ivory/80 transition-colors hover:text-ivory"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="mb-5 text-xs font-medium uppercase tracking-[0.25em] text-ivory/50">
                            Connect
                        </h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href={`${instagramUrl}`}
                                    target="_blank"
                                    className="text-sm font-light text-ivory/80 transition-colors hover:text-ivory"
                                >
                                    Instagram
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${contactEmail}`}
                                    className="text-sm font-light text-ivory/80 transition-colors hover:text-ivory"
                                >
                                    Email
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-ivory/15 pt-8 md:flex-row">
                    <p className="text-xs font-light text-ivory/50">
                        © {new Date().getFullYear()} {brandName}. Made slowly,
                        by hand.
                    </p>
                    <span className="text-xs font-light tracking-[0.2em] text-ivory/40">
                        HANDMADE · SLOW CRAFTED · ONE STITCH AT A TIME
                    </span>
                </div>
            </div>
        </footer>
    );
}
