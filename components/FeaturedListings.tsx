"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type Listing = {
  id: string;
  title: string;
  desc: string;
  price: string;
  period: string;
  image: string;
};

const DEMO_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Serenity Haven",
    desc: "Discover Serenity Haven, a secluded retreat with 4 bedrooms, 3 bathrooms, and 2,500 square feet of luxurious living space nestled in a serene forest setting.",
    price: "$ 300,000.00 USD",
    period: "/Monthly",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "2",
    title: "Riverside Villa",
    desc: "Experience tranquility at Riverside Villa, offering 2,500 square feet of living space. This charming home includes 3 bedrooms and 2 bathrooms, perfect for comfortable living.",
    price: "$ 220,000.00 USD",
    period: "/Monthly",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "3",
    title: "Skyline Studio",
    desc: "A bright studio with skyline views, modern finishes, and smart storage — ideal for city living with comfort and style.",
    price: "$ 120,000.00 USD",
    period: "/Monthly",
    image:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80",
  },
];

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

const textContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.18,
    },
  },
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 1, 0.35, 1] },
  },
};






function FeaturedListingRow({ item, isLast }: { item: Listing; isLast: boolean }) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rowRef, { once: false, margin: "-25% 0px -25% 0px" });

  return (
    <div ref={rowRef} className="w-full">
      <div className="group relative grid grid-cols-1 gap-7 hover:cursor-pointer md:grid-cols-[minmax(320px,0.95fr)_1.05fr] md:items-center md:gap-8 lg:grid-cols-[620px_1fr]">
        <motion.div
          variants={imageRevealVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative overflow-hidden rounded-2xl bg-neutral-100 shadow-sm"
        >
          <div className="relative w-full aspect-[16/10] md:aspect-[16/11] lg:aspect-[14/8]">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 767px) 100vw, (max-width: 1024px) 48vw, 620px"
              priority={false}
            />
          </div>
        </motion.div>

        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex h-full flex-col justify-between pb-2 md:py-2"
        >
          <div className="flex flex-col gap-4">
            <motion.div variants={textItemVariants} className="flex items-start justify-between gap-5">
              <h3 className="text-3xl font-medium tracking-tight transition-colors duration-500 group-hover:text-[var(--background-primary)] sm:text-4xl md:text-[44px] md:leading-[1.05] lg:text-5xl">
                {item.title}
              </h3>

              <div className="relative shrink-0">
                <div className="absolute right-0 top-0 h-12 w-12 rounded-full bg-[var(--background-primary)] opacity-0 blur-md transition-all duration-500 ease-out group-hover:opacity-100 group-hover:blur-0 md:h-14 md:w-14" />
                <div className="relative flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-[var(--background-primary)] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 md:h-14 md:w-14">
                  <ArrowUpRight className="h-5 w-5 text-white md:h-6 md:w-6" />
                </div>
              </div>
            </motion.div>

            <motion.p
              variants={textItemVariants}
              className="max-w-xl text-sm leading-6 text-neutral-500 md:text-[15px] lg:text-[15px]"
            >
              {item.desc}
            </motion.p>
          </div>

          <motion.div variants={textItemVariants} className="mt-6 flex items-end gap-3">
            <div className="text-2xl font-medium tracking-tight text-neutral-900 sm:text-3xl md:text-[34px] lg:text-4xl">
              {item.price}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {!isLast && <div className="my-10 h-px w-full bg-neutral-200 md:my-14" />}
    </div>
  );
}



export default function FeaturedListings({ listings = DEMO_LISTINGS }: { listings?: Listing[] }) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1350px] px-[2.5%] py-14 sm:py-16 md:py-24 lg:py-28">
        <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-neutral-900 md:text-6xl">
          Featured Listings
        </h2>

        <div className="mt-10 md:mt-12">
          {listings.map((item, idx) => (
            <FeaturedListingRow
              key={item.id}
              item={item}
              isLast={idx === listings.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
