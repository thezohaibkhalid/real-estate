"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Urbanist } from "next/font/google";
import { motion, Variants, useInView } from "framer-motion";

const urbanist = Urbanist({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    style: ["normal", "italic"],
    display: "swap",
});

const easeOut = [0.16, 1, 0.3, 1] as const;

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.16 },
    },
};

const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: { duration: 1, ease: easeOut } },
};

const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 24 },
    show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: easeOut } },
};

const lineUp: Variants = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: easeOut } },
};

export default function CeoWords() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, amount: 0.28 });

    return (
        <section className="relative w-full overflow-hidden py-16 md:py-20">
            {/* Decorative background element */}
            <div
                className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-[#f8f8f8] mix-blend-multiply blur-3xl opacity-60"
                aria-hidden="true"
            />
            <div
                className="pointer-events-none absolute -left-20 -bottom-20 h-[500px] w-[500px] rounded-full bg-[#f0f0f0] mix-blend-multiply blur-3xl opacity-40"
                aria-hidden="true"
            />

            <motion.div
                ref={ref}
                className="relative mx-auto w-full max-w-[1300px] px-4 sm:px-6"
                variants={container}
                initial="hidden"
                animate={isInView ? "show" : "hidden"}
            >
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <motion.div variants={fadeInLeft} className="relative">
                        <div className="relative aspect-[6/7] w-full overflow-hidden rounded-[2.5rem] shadow-[0_18px_48px_rgba(0,0,0,0.10)]">
                            <Image
                                src="/about/ceo.png"
                                alt="CEO Portrait"
                                fill
                                priority
                                className="object-cover"
                                sizes="(min-width: 1024px) 560px, 100vw"
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={fadeInRight} className="flex flex-col">
                        <motion.div variants={lineUp} className="space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="h-px w-10 bg-neutral-200" />
                                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">
                                    Leadership Message
                                </span>
                            </div>

                            <h2
                                className={`${urbanist.className} text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl lg:text-7xl`}
                            >
                                CEO&apos;s Words
                            </h2>
                        </motion.div>

                        <motion.div variants={lineUp} className="mt-8 space-y-6">
                            <p className={`${urbanist.className} text-xl font-medium text-neutral-900 md:text-2xl`}>
                                <span className="italic text-neutral-800">“Dear RealtiFye Community,”</span>
                            </p>

                            <div className="space-y-5 text-[17px] leading-[1.9] text-neutral-600 md:text-lg">
                                <p>
                                    It is a privilege to lead the team at{" "}
                                    <span className="font-semibold text-neutral-900">RealtiFye</span>. We believe great
                                    real estate is built on clarity, trust, and long-term value.
                                </p>

                                <p>
                                    Every project we take on is guided by a commitment to{" "}
                                    <span className="font-medium text-neutral-900">craft, innovation, and sustainability</span>
                                    — creating spaces that feel timeless, perform beautifully, and elevate the communities around them.
                                </p>

                                <p>Thank you for trusting us with your vision. We’re honored to build what’s next—together.</p>
                            </div>

                            <div className="mt-8 h-px w-full" />
                        </motion.div>

                        <motion.div variants={lineUp} className="mt-8 flex flex-col items-start gap-3">
                            <div className="relative h-16 w-56">
                                <Image
                                    src="/about/signature.png"
                                    alt="CEO Signature"
                                    fill
                                    className="object-contain object-left grayscale contrast-125 brightness-90"
                                    sizes="224px"
                                />
                            </div>

                            <div>
                                <p className={`${urbanist.className} text-lg font-semibold text-neutral-900`}>
                                    Alex J. Maxwell
                                </p>
                                <p className="text-sm font-medium text-neutral-500">CEO &amp; Founder, RealtiFye</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
