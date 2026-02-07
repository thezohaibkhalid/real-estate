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

const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.35, 1],
    },
  },
};

const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 1.2, ease: easeOut } },
};

const lineUp: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function CeoWords() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.28 });

  return (
    <section className="relative w-full overflow-hidden bg-white py-14 md:py-16">
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
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            variants={imageRevealVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <div className="relative aspect-[5/6] w-full overflow-hidden rounded-[26px] bg-neutral-100 shadow-[0_18px_48px_rgba(0,0,0,0.10)]">
              <Image
                src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80"
                alt="CEO Portrait"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 560px, 100vw"
                priority={false}
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
                className={`${urbanist.className} text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-900 sm:text-5xl`}
              >
                CEO&apos;s Words
              </h2>
            </motion.div>

            <motion.div variants={lineUp} className="mt-6 space-y-6">
              <p className={`${urbanist.className} text-xl font-medium text-neutral-900 md:text-2xl`}>
                <span className="italic text-neutral-800">“Dear PropertyPalace Community,”</span>
              </p>

              <div className="space-y-5 text-[17px] leading-[1.95] text-neutral-700 md:text-lg">
                <p>
                  At <span className="font-semibold text-neutral-900">PropertyPalace</span>, we focus on helping
                  people find the right home with clarity, confidence, and care.
                </p>

                <p>
                  Our team blends local market knowledge with modern tools to guide you through every step—whether
                  you’re buying, selling, or investing for the long term.
                </p>

                <p>Thank you for trusting us with one of life’s biggest decisions. We’re here for what’s next.</p>
              </div>

              <div className="mt-8 h-px w-full bg-neutral-200" />
            </motion.div>

            <motion.div variants={lineUp} className="mt-8 flex flex-col items-start gap-3">
              <div className="relative h-14 w-52">
                <Image
                  src="/about/signature.png"
                  alt="CEO Signature"
                  fill
                  className="object-contain object-left grayscale contrast-125 brightness-90"
                  sizes="208px"
                />
              </div>

              <div>
                <p className={`${urbanist.className} text-lg font-semibold text-neutral-900`}>
                  Alex J. Maxwell
                </p>
                <p className="text-sm font-medium text-neutral-500">
                  CEO &amp; Founder, PropertyPalace
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
