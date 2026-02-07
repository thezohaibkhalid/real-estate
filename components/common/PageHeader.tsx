"use client";

import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Urbanist } from 'next/font/google'
import { motion, Variants, useInView } from 'framer-motion'

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const slideUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const zoomOut: Variants = {
  hidden: { scale: 1.15 },
  show: {
    scale: 1,
    transition: { duration: 6, ease: [0.16, 1, 0.3, 1] },
  },
};

const textContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const PageHeader = ({ title, image, breadcrumb }: { title: string, image: string, breadcrumb: { label: string, href: string }[] }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  return (
    <section ref={ref} className='w-full h-[65vh] relative overflow-hidden'>
      <motion.div
        className="absolute inset-0"
        variants={zoomOut}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <Image
          src={image}
          alt="Page Header"
          fill
          className='object-cover'
          priority
        />
      </motion.div>

      {/* <div className='absolute inset-0 bg-black/20' /> */}

      <motion.div
        className='absolute inset-0 flex flex-col max-w-[1350px] mx-auto justify-center px-[4%] md:px-0'
        variants={textContainer}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div variants={slideUp} className='mb-6'>
          <span className={`${urbanist.className} text-white/80 text-[16px] font-medium tracking-wide`}>
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-2 opacity-50">/</span>}
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              </React.Fragment>
            ))}
          </span>
        </motion.div>

        <motion.h1
          className={`${urbanist.className} xl:text-[96px] lg:text-[80px] md:text-[64px] text-[48px] leading-[1.1] font-semibold text-white tracking-tight`}
          variants={slideUp}
        >
          {title}
        </motion.h1>
      </motion.div>
    </section>
  )
}

export default PageHeader