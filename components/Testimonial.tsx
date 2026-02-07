"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

interface StatItem {
  id: number;
  value: string;
  label: string;
  description: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Amelia Carter",
    title: "First-time Buyer • Austin, TX",
    quote:
      "We found the perfect home in under two weeks. The listings were accurate, the scheduling was effortless, and every step felt guided without pressure.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    name: "Noah Williams",
    title: "Investor • Miami, FL",
    quote:
      "The neighborhood insights and comparable pricing made decision-making fast. I closed confidently knowing I wasn’t overpaying—and the process stayed smooth.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    name: "Sophia Lee",
    title: "Relocation • Seattle, WA",
    quote:
      "From virtual tours to final paperwork, everything felt streamlined. We relocated with zero surprises and landed in a home that matched our lifestyle.",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    name: "Ethan Brooks",
    title: "Seller • San Diego, CA",
    quote:
      "Our property got strong interest immediately. The pricing guidance and marketing presentation were spot on, and we sold quickly at a great value.",
    image:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=1200&q=80",
  },
];

const DEFAULT_STATS: StatItem[] = [
  {
    id: 1,
    value: "12K+",
    label: "Active Listings",
    description: "Updated inventory across top neighborhoods and new developments.",
  },
  {
    id: 2,
    value: "4.9/5",
    label: "Client Satisfaction",
    description: "Highly rated support from search to closing—buyers and sellers.",
  },
  {
    id: 3,
    value: "48 hrs",
    label: "Avg. Tour Scheduling",
    description: "Fast viewing coordination with real-time availability windows.",
  },
  {
    id: 4,
    value: "1.2K+",
    label: "Homes Closed",
    description: "Successful transactions powered by verified listings and insights.",
  },
];

const   Testimonials = ({
  testimonials = DEFAULT_TESTIMONIALS,
  stats = DEFAULT_STATS,
  heading = "Testimonials",
  subheading = "Real stories from buyers, sellers, and investors who found the right property—faster and with confidence.",
}: {
  testimonials?: Testimonial[];
  stats?: StatItem[];
  heading?: string;
  subheading?: string;
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { margin: "-120px" });

  const safeTestimonials = useMemo(() => {
    const arr = Array.isArray(testimonials) ? testimonials.filter(Boolean) : [];
    return arr.length ? arr : DEFAULT_TESTIMONIALS;
  }, [testimonials]);

  const safeStats = useMemo(() => {
    const arr = Array.isArray(stats) ? stats.filter(Boolean) : [];
    return arr.length ? arr : DEFAULT_STATS;
  }, [stats]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (activeIndex > safeTestimonials.length - 1) setActiveIndex(0);
    }, 100);
  }, [safeTestimonials.length, activeIndex]);

  const handlePrev = () => {
    if (safeTestimonials.length <= 1) return;
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? safeTestimonials.length - 1 : prev - 1));
    setIsPaused(true);
  };

  const handleNext = () => {
    if (safeTestimonials.length <= 1) return;
    setDirection(1);
    setActiveIndex((prev) => (prev === safeTestimonials.length - 1 ? 0 : prev + 1));
    setIsPaused(true);
  };

  useEffect(() => {
    if (isPaused || !isInView || safeTestimonials.length <= 1) return;
    const interval = window.setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev === safeTestimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => window.clearInterval(interval);
  }, [isPaused, isInView, safeTestimonials.length]);

  const headingVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const statsContainerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const statItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const activeSlideVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 70 : -70,
      filter: "blur(6px)",
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.55, ease: [0.25, 1, 0.35, 1] },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -70 : 70,
      filter: "blur(6px)",
      transition: { duration: 0.35, ease: "easeInOut" },
    }),
  };

  const current = safeTestimonials[activeIndex];

  return (
    <section className="w-full py-10 md:py-16 bg-white overflow-x-hidden">
      <div ref={ref} className="max-w-[1350px] mx-auto px-[4%] md:px-0">
        <motion.div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10"
          variants={headingVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#101828]">
              {heading}
            </h2>
            <p className="mt-4 text-sm md:text-base font-semibold text-gray-700 leading-relaxed">
              {subheading}
            </p>
          </div>

          <div className="flex gap-3 self-start md:self-center">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="h-10 w-10 rounded-full border border-[#D0D5DD] bg-gray-100 hover:bg-[var(--background-primary)] hover:text-white flex items-center justify-center backdrop-blur-sm shadow-sm hover:shadow-md hover:border-[var(--background-primary)]/70 hover:ring-2 hover:ring-[var(--background-primary)]/25 active:scale-95 transition-all duration-400  cursor-pointer hover:scale-105 active:scale-90"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="h-10 w-10 rounded-full border border-[#D0D5DD] bg-gray-100 flex items-center justify-center hover:bg-[var(--background-primary)] hover:text-white backdrop-blur-sm shadow-sm hover:shadow-md hover:border-[var(--background-primary)]/70 hover:ring-2 hover:ring-[var(--background-primary)]/25 active:scale-95 transition-all duration-400 cursor-pointer hover:scale-105 active:scale-90"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        <div
          className="mb-14 overflow-hidden rounded-3xl bg-white"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
        >
          {current ? (
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={activeSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full py-8 flex flex-col lg:flex-row gap-10 items-center lg:items-stretch"
              >
                <div className="flex-1 lg:basis-[32%] w-full max-w-sm lg:max-w-none">
                  <div className="relative h-full min-h-[260px] md:min-h-[320px] rounded-2xl overflow-hidden bg-gray-100">
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 28vw, (min-width: 768px) 60vw, 90vw"
                      priority={activeIndex === 0}
                    />
                  </div>
                </div>

                <div className="flex-1 lg:basis-[68%] flex flex-col justify-between h-full">
                  <p className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-snug text-[#101828] mb-8">
                    {current.quote}
                  </p>

                  <div>
                    <p className="font-semibold text-[#101828]">{current.name}</p>
                    <p className="text-sm text-[#667085]">{current.title}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : null}
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10"
          variants={statsContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {safeStats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={statItemVariants}
              className="text-center md:text-left"
            >
              <p className="text-3xl md:text-4xl font-bold text-center text-[var(--background-primary)]">
                {stat.value}
              </p>
              <p className="mt-2 font-semibold text-[#101828] text-center">
                {stat.label}
              </p>
              <p className="mt-2 text-sm text-[#667085] leading-relaxed text-center">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
