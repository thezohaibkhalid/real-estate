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
      delayChildren: 0.2,
    },
  },
};

const textItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.35, 1],
    },
  },
};

function FeaturedListingRow({
  item,
  isLast,
}: {
  item: Listing;
  isLast: boolean;
}) {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rowRef, { once: false, margin: "-90px 0px -120px 0px" });

  return (
    <div ref={rowRef} className="w-full ">
      <div className="group relative grid grid-cols-1 gap-8 md:grid-cols-[620px_1fr] hover:cursor-pointer ">
        <motion.div
          variants={imageRevealVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative overflow-hidden rounded-2xl bg-neutral-100 shadow-sm"
        >
          <div className="relative aspect-[14/8] w-full">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              sizes="(max-width: 768px) 100vw, 620px"
              priority={false}
            />
          </div>
        </motion.div>

        <motion.div
          variants={textContainerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex h-full  flex-col justify-between py-2"
        >
          <div className="flex flex-col gap-4">
            <motion.div variants={textItemVariants} className="flex items-start justify-between gap-6">
              <h3 className="text-4xl font-medium tracking-tight transition-colors duration-500 group-hover:text-[var(--background-primary)] md:text-5xl">
                {item.title}
              </h3>

              <div className="relative">
                <div className="absolute right-0 top-0 h-14 w-14 rounded-full bg-[var(--background-primary)] opacity-0 blur-md transition-all duration-500 ease-out group-hover:opacity-100 group-hover:blur-0" />
                <div className="relative flex h-14 w-14 translate-y-4 items-center justify-center rounded-full bg-[var(--background-primary)] opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-6 w-6 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.p variants={textItemVariants} className="max-w-xl text-sm leading-6 text-neutral-500 md:text-[15px]">
              {item.desc}
            </motion.p>
          </div>

          <motion.div variants={textItemVariants} className="mt-6 flex items-end gap-3">
            <div className="text-3xl font-medium tracking-tight text-neutral-900 md:text-4xl">
              {item.price}
            </div>
            {/* <div className="pb-1 text-sm text-neutral-500">{item.period}</div> */}
          </motion.div>
        </motion.div>
      </div>

      {!isLast && <div className="my-14 h-px w-full bg-neutral-200" />}
    </div>
  );
}

export default function FeaturedListings({
  listings = DEMO_LISTINGS,
}: {
  listings?: Listing[];
}) {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1300px] px-4 py-16 sm:px-6 md:py-20">
        <h2 className="text-5xl font-medium tracking-tight text-neutral-900 md:text-6xl">
          Featured Listings
        </h2>

        <div className="mt-12">
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
