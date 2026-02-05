"use client";

import Image from "next/image";
import { Urbanist } from "next/font/google";
import { motion, Variants } from "framer-motion";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const textWrap: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const zoomOut: Variants = {
  hidden: { scale: 1.15 },
  show: {
    scale: 1,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HeroBg() {
  return (
    <section className="relative w-full xl:h-[750px] lg:h-[650px] md:h-[550px] h-[350px] overflow-hidden">
      <motion.div
        className="absolute inset-0"
        variants={zoomOut}
        initial="hidden"
        animate="show"
      >
        <Image
          src="/images/main-hero-bg.webp"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* <div className="absolute inset-0 bg-black/20" /> */}

      <div className="relative max-w-[1300px] mx-auto  flex-col justify-center h-full xl:px-0 lg:px-0 px-4 text-white hidden md:flex ">
        <motion.h1
          className={`${urbanist.className} font-medium tracking-[2px] xl:text-[86px] lg:text-[70px] md:text-[66px] text-[46px] leading-[1.02] mt-6 px-[2.5%]`}
          variants={textWrap}
          initial="hidden"
          animate="show"
        >
          <motion.span className="block" variants={slideUp}>
            Find the right and best
          </motion.span>

          <motion.span className="block" variants={slideUp}>
            home for your family
          </motion.span>
        </motion.h1>
      </div>
    </section>
  );
}
