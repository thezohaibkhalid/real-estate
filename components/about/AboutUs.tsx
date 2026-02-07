"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Urbanist } from "next/font/google";
import { motion, useReducedMotion, useInView } from "framer-motion";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

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
    <section className="relative w-full overflow-hidden bg-[#0d0d0d]  ">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(900px 450px at 20% 10%, rgba(255,255,255,0.08), transparent 60%), radial-gradient(700px 380px at 85% 35%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />

      <motion.div
        ref={ref}
        className="relative mx-auto w-full max-w-[1350px] px-[4%] py-16 sm:px-6 sm:py-20 md:py-24 lg:py-28 md:px-0"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
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

        <motion.hr
          className="my-12 h-px max-w-[1350px] bg-white/10 sm:my-14 md:my-16 lg:my-20"
          style={{ transformOrigin: "left" }}
          variants={line}
        />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12">
          {features.map((feature) => (
            <motion.article
              key={feature.title}
              variants={card}
              className="flex items-start gap-4 sm:gap-5"
            >
              <div className="shrink-0">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  width={75}
                  height={75}
                />
              </div>

              <div className="space-y-2">
                <h3 className={`${urbanist.className} text-xl font-medium text-white md:text-3xl`}>
                  {feature.title}
                </h3>

                <p className="text-[14px] leading-relaxed text-white/60 sm:text-[15px] md:text-[16px]">
                  {feature.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
