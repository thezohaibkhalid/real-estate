"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Urbanist } from "next/font/google";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const values = [
  {
    image: "/icons/about/4.svg",
    title: "Affordable Price",
    description: "Offering competitive rates that make quality accessible to all.",
  },
  {
    image: "/icons/about/5.svg",
    title: "Innovative Excellence",
    description: "Inspiring change with creative solutions and superior excellence.",
  },
  {
    image: "/icons/about/6.svg",
    title: "Quality Crafts",
    description: "Exceptional craftsmanship and premium quality in every creation.",
  },
  {
    image: "/icons/about/7.svg",
    title: "Clear Legality",
    description: "Ensuring transparency and compliance in all legal matters.",
  },
  {
    image: "/icons/about/8.svg",
    title: "Experienced Agents",
    description: "Skilled professionals delivering expert guidance and support.",
  },
  {
    image: "/icons/about/9.svg",
    title: "Honest Opinion",
    description: "Transparent and sincere perspectives you can trust.",
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

function useMotionPrefs() {
  const reduce = useReducedMotion();
  return {
    reduce,
    dur: reduce ? 0 : 0.75,
    hoverDur: reduce ? 0 : 0.25,
  };
}

export default function OurValues() {
  const { reduce, dur } = useMotionPrefs();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.35 });

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: dur, ease: easeOut },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: dur, ease: easeOut },
    },
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <motion.div
        ref={ref}
        className="relative mx-auto w-full max-w-[1300px] px-[4%] py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28 md:px-0"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div className="text-center mb-12 md:mb-16 lg:mb-20" variants={fadeUp}>
          <h2
            className={`${urbanist.className} text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-black leading-tight`}
          >
            The Values That Drive <br className="hidden sm:block" /> Everything We Do
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-x-12 lg:gap-y-16">
          {values.map((value) => (
            <motion.article
              key={value.title}
              variants={card}
              className="flex items-start gap-4 sm:gap-5"
            >
              <div className="shrink-0">
                <Image
                  src={value.image}
                  alt={value.title}
                  width={75}
                  height={75}
                />
              </div>

              <div className="space-y-2">
                <h3 className={`${urbanist.className} text-xl font-medium text-black md:text-3xl`}>
                  {value.title}
                </h3>

                <p className="text-[14px] leading-relaxed text-gray-600 sm:text-[15px] md:text-[16px]">
                  {value.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="flex justify-center mt-12 md:mt-16"
          variants={fadeUp}
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-[var(--background-primary)] text-[var(--background-primary)] rounded-full hover:bg-[var(--background-primary)] hover:text-white transition-all duration-400 ease-in-out font-medium text-base group"
          >
            Get In Touch
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
