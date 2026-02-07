"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, useInView } from "framer-motion";
import { Urbanist } from "next/font/google";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

type Stat = {
  id: string;
  title: string;
  value: string;
  suffix?: string;
  note: string;
};

const DEMO_STATS: Stat[] = [
  {
    id: "team",
    title: "Our core team spread all over the world",
    value: "48",
    suffix: "+",
    note: "In Numbers",
  },
  {
    id: "projects",
    title: "Projects We Completed along the way",
    value: "436",
    suffix: "+",
    note: "",
  },
  {
    id: "cities",
    title: "States/Cities represents in our agency",
    value: "12",
    suffix: "+",
    note: "",
  },
];

const easeOut = [0.16, 1, 0.3, 1] as const;

function useMotionPrefs() {
  const reduce = useReducedMotion();
  return {
    reduce,
    dur: reduce ? 0 : 0.75,
  };
}

export default function AboutUsNumbers({
  heading = "Welcome to RealtiFye! As a design, build, and development firm, our goal is to shape communities that enrich, fortify the surrounding neighborhoods",
  ctaText = "Explore All Properties",
  ctaHref = "/properties",
  stats = DEMO_STATS,
}: {
  heading?: string;
  ctaText?: string;
  ctaHref?: string;
  stats?: Stat[];
}) {
  const { reduce, dur } = useMotionPrefs();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const isSectionInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start end", "center center"],
  });

  const blurValue = useTransform(scrollYProgress, [0, 0.5, 1], [10, 5, 0]);
  const blur = useTransform(blurValue, (value) => `blur(${value}px)`);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 1]);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: dur, ease: easeOut },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: { duration: dur, ease: easeOut },
    },
  };

  return (
    <section ref={sectionRef} className="w-full">
      <div className="mx-auto w-full max-w-[1300px] px-[4%] py-20 sm:px-6 md:py-28 lg:py-32">
        <motion.div
          className="mx-auto max-w-[1100px] text-center"
          initial="hidden"
          animate={isSectionInView ? "show" : "hidden"}
          variants={container}
        >
          <motion.h2
            ref={textRef}
            className={`${urbanist.className} text-[40px] font-semibold leading-[1.15] tracking-tight text-neutral-900 sm:text-[56px] md:text-[68px] lg:text-[76px]`}
            style={
              reduce
                ? {}
                : {
                  filter: blur,
                  opacity: opacity,
                }
            }
            transition={{ duration: 0 }}
          >
            {heading}
          </motion.h2>

          <motion.div className="mt-12 flex justify-center" variants={fadeUp}>
            <Link
              href={ctaHref}
              className="group inline-flex items-center justify-center gap-3 rounded-full border-2 border-[var(--background-primary)] bg-transparent px-9 py-4 text-base font-semibold text-[var(--background-primary)] transition-all duration-300 hover:bg-[var(--background-primary)] hover:text-white"
            >
              {ctaText}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-20 h-px w-full bg-black/10"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isSectionInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.8, ease: easeOut }}
          style={{ transformOrigin: "left" }}
        />

        <motion.div
          ref={statsRef}
          className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[1fr_3fr] md:gap-16"
          initial="hidden"
          animate={isStatsInView ? "show" : "hidden"}
          variants={container}
        >
          <motion.div
            className={`${urbanist.className} text-lg font-semibold text-neutral-900 md:pt-2`}
            variants={fadeUp}
          >
            In Numbers
          </motion.div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-10">
            {stats.map((s) => (
              <motion.div key={s.id} className="min-w-0" variants={scaleIn}>
                <div className={`${urbanist.className} text-[15px] leading-6 text-neutral-600 font-medium`}>
                  {s.title}
                </div>

                <div className="mt-8 flex items-end gap-1">
                  <div
                    className={`${urbanist.className} text-[72px] font-bold leading-none tracking-tight text-neutral-900 sm:text-[80px] lg:text-[88px]`}
                  >
                    {s.value}
                  </div>
                  <div
                    className={`${urbanist.className} pb-3 text-[72px] font-bold leading-none tracking-tight text-[var(--background-primary)] sm:text-[80px] lg:text-[88px]`}
                  >
                    {s.suffix || "+"}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
