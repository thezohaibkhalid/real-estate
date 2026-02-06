"use client";

import React from "react";
import Image from "next/image";
import { Urbanist } from "next/font/google";
import { motion, useReducedMotion } from "framer-motion";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const features = [
  {
    image: "/icons/about/icon1.svg",
    title: "Affordable Price",
    description: "Offering competitive rates that make quality accessible to all.",
  },
  {
    image: "/icons/about/icon2.svg",
    title: "Clear Legality",
    description: "Ensuring transparent and compliant legal processes.",
  },
  {
    image: "/icons/about/icon3.svg",
    title: "Experienced Agents",
    description: "Guided by professionals with expertise in the industry.",
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

export default function AboutUs() {
  const { reduce, dur, hoverDur } = useMotionPrefs();

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

  const line = {
    hidden: { scaleX: 0, opacity: 0.3 },
    show: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: reduce ? 0 : 0.9, ease: easeOut },
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
    <section className="relative w-full overflow-hidden bg-[#0d0d0d]">
      {/* subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(900px 450px at 20% 10%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(700px 380px at 85% 35%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />

      <motion.div
        className="relative mx-auto w-full max-w-[1300px] px-4 py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.35 }}
      >
        {/* Header */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
          <motion.div className="col-span-1" variants={fadeUp}>
            <span
              className={`${urbanist.className} text-2xl font-medium tracking-wide text-white/80 sm:text-base lg:text-3xl`}
            >
              About us
            </span>
          </motion.div>

          <motion.div className="col-span-1 md:col-span-2" variants={fadeUp}>
            <h2
              className={`${urbanist.className} font-light leading-snug text-white sm:text-3xl md:text-4xl lg:text-5xl lg:leading-[1.3]`}
            >
              Our mission is simple, to provide unparalleled expertise, guidance, and support
              to our clients across their real estate journey.
            </h2>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.hr
          className="my-12 h-px max-w-[1300px] bg-white/10 sm:my-14 md:my-16 lg:my-20"
          style={{ transformOrigin: "left" }}
          variants={line}
        />

        {/* Features */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              variants={card}
              whileHover={reduce ? undefined : { y: -3 }}
              transition={{ duration: hoverDur, ease: easeOut }}
              className="group relative flex items-start gap-4 sm:gap-5"
            >
              {/* icon */}
              <motion.div
                className="shrink-0"
                whileHover={reduce ? undefined : { scale: 1.06, rotate: -1 }}
                transition={{ duration: hoverDur, ease: easeOut }}
              >
                <div className="relative">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.14), transparent 65%)",
                    }}
                  />
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={75}
                    height={75}
                    className="relative"
                  />
                </div>
              </motion.div>

              {/* text */}
              <div className="space-y-2">
                <motion.h3
                  className={`${urbanist.className} text-xl font-medium text-white md:text-3xl`}
                  initial={false}
                  animate={undefined}
                >
                  {feature.title}
                </motion.h3>

                <motion.p className="text-[14px] leading-relaxed text-white/60 sm:text-[15px] md:text-[16px]">
                  {feature.description}
                </motion.p>

                {/* subtle repeating shimmer line (professional + minimal) */}
                {!reduce && (
                  <motion.div
                    aria-hidden
                    className="mt-3 h-[1px] w-full overflow-hidden rounded-full bg-white/10"
                  >
                    <motion.div
                      className="h-full w-24 rounded-full bg-[var(--background-primary)]/60"
                      initial={{ x: -120, opacity: 0.0 }}
                      animate={{ x: ["-120px", "140%"], opacity: [0, 0.7, 0] }}
                      transition={{
                        duration: 2.8,
                        ease: "linear",
                        repeat: Infinity,
                        repeatDelay: 1.2 + index * 0.25, // slightly offset per card
                      }}
                    />
                  </motion.div>
                )}
              </div>

              {/* soft border on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 transition group-hover:ring-[var(--background-primary)]/20" />
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
