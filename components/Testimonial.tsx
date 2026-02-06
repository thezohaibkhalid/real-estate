"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const DEMO_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "RealtiFye has been an invaluable partner in our search for the perfect commercial space. Their team is incredibly knowledgeable and dedicated, making the entire process seamless and stress-free.",
    name: "John Smith",
    role: "CEO, Tech Innovations Inc.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    quote:
      "From the first call to closing, everything felt effortless. The guidance was clear, the options were curated, and we always felt one step ahead in the market.",
    name: "Ayesha Khan",
    role: "Founder, Studio North",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    quote:
      "The level of professionalism and speed was exceptional. We secured the right location faster than expected—without compromising on any of our requirements.",
    name: "Daniel Rivera",
    role: "Operations Director, Horizon Retail",
    avatar:
      "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=400&q=80",
  },
];

const quoteVariants: Variants = {
  initial: { opacity: 0, y: 14, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(10px)",
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const metaVariants: Variants = {
  initial: { opacity: 0, y: 10, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(8px)",
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Testimonials({
  title = "Testimonials",
  testimonials = DEMO_TESTIMONIALS,
  autoRotateMs = 6000,
}: {
  title?: string;
  testimonials?: Testimonial[];
  autoRotateMs?: number;
}) {
  const items = useMemo(
    () => (testimonials.length ? testimonials : DEMO_TESTIMONIALS),
    [testimonials]
  );

  const [idx, setIdx] = useState(0);
  const pauseRef = useRef(false);

  const go = (next: number) => {
    const len = items.length;
    setIdx(((next % len) + len) % len);
  };

  const onPrev = () => go(idx - 1);
  const onNext = () => go(idx + 1);

  useEffect(() => {
    if (items.length <= 1) return;
    const t = window.setInterval(() => {
      if (pauseRef.current) return;
      setIdx((p) => (p + 1) % items.length);
    }, autoRotateMs);
    return () => window.clearInterval(t);
  }, [items.length, autoRotateMs]);

  const current = items[idx];

  return (
    <section className="w-full bg-[var(--background-primary)]">
      <div className="mx-auto w-full max-w-[1300px] px-4 py-20 sm:px-6">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-[40px] font-light tracking-tight text-white sm:text-[54px] md:text-[62px]">
            {title}
          </h2>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous testimonial"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/0 text-white transition-all duration-300 hover:bg-white/10"
              onMouseEnter={() => (pauseRef.current = true)}
              onMouseLeave={() => (pauseRef.current = false)}
              onFocus={() => (pauseRef.current = true)}
              onBlur={() => (pauseRef.current = false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next testimonial"
              className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/40 bg-white/0 text-white transition-all duration-300 hover:bg-white/10"
              onMouseEnter={() => (pauseRef.current = true)}
              onMouseLeave={() => (pauseRef.current = false)}
              onFocus={() => (pauseRef.current = true)}
              onBlur={() => (pauseRef.current = false)}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className="mt-14"
          onMouseEnter={() => (pauseRef.current = true)}
          onMouseLeave={() => (pauseRef.current = false)}
        >
          <div className="max-w-[980px]">
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                variants={quoteVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-[26px] font-light leading-[1.35] text-white sm:text-[32px] md:text-[38px]"
              >
                “{current.quote}”
              </motion.p>
            </AnimatePresence>

            <div className="mt-10 h-px w-full bg-white/35" />

            <div className="mt-8 flex items-center gap-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${current.id}-meta`}
                  variants={metaVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex items-center gap-5"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-full bg-white/20">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                      priority={false}
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="text-lg font-medium text-white">
                      {current.name}
                    </div>
                    <div className="mt-1 text-sm font-light text-white/85">
                      {current.role}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
