"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

type City = {
  id: string;
  name: string;
  listings: number;
  image: string;
};

const DEMO_CITIES: City[] = [
  {
    id: "ca",
    name: "California",
    listings: 1264,
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "miami",
    name: "Miami",
    listings: 923,
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "ny",
    name: "New York",
    listings: 2285,
    image:
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dc",
    name: "Washington DC",
    listings: 455,
    image:
      "https://images.unsplash.com/photo-1541845157-a6d2d100c931?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "la",
    name: "Los Angeles",
    listings: 811,
    image:
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "chi",
    name: "Chicago",
    listings: 612,
    image:
      "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "hou",
    name: "Houston",
    listings: 612,
    image:
      "https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "den",
    name: "Denver",
    listings: 612,
    image:
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "dal",
    name: "Dallas",
    listings: 612,
    image:
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?auto=format&fit=crop&w=1600&q=80",
  },
];

function formatListings(n: number) {
  return n.toLocaleString("en-US");
}

const CARD_WIDTH = 280;
const GAP = 32;

export default function PopularCities({
  cities = DEMO_CITIES,
  title = "Popular Cities",
}: {
  cities?: City[];
  title?: string;
}) {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  const maxIndex = useMemo(
    () => Math.max(0, cities.length - visibleCount),
    [cities.length, visibleCount]
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      const width = el.offsetWidth;
      const count = Math.floor((width + GAP) / (CARD_WIDTH + GAP));
      setVisibleCount(Math.max(1, count));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-city-card]"));
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const node = e.target as HTMLElement;
          if (e.isIntersecting) {
            node.dataset.reveal = "1";
            node.style.opacity = "1";
            node.style.transform = "translateY(0px)";
          } else {
            node.dataset.reveal = "0";
            node.style.opacity = "0";
            node.style.transform = "translateY(20px)";
          }
        }
      },
      { threshold: 0.25 }
    );

    items.forEach((n) => {
      n.style.opacity = "0";
      n.style.transform = "translateY(20px)";
      io.observe(n);
    });

    return () => io.disconnect();
  }, [cities.length, visibleCount, index]);

  const handleNext = () => setIndex((prev) => Math.min(prev + 1, maxIndex));
  const handlePrev = () => setIndex((prev) => Math.max(prev - 1, 0));

  const canLeft = index > 0;
  const canRight = index < maxIndex;

  return (
    <section ref={sectionRef} className="w-full bg-[#0b0c10] overflow-hidden">
      <div className="mx-auto w-full max-w-[1300px] px-4 py-20 sm:px-6">
        <div className="flex items-center justify-between gap-6 overflow-hidden">
          <h2 className="text-[40px] font-light tracking-tight text-white sm:text-[54px] md:text-[62px]">
            {title}
          </h2>

          <div className="flex items-center gap-2 overflow-hidden p-2">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canLeft}
              className={`group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:bg-(--background-primary) hover:border-transparent hover:scale-105 active:scale-90 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-white/5 disabled:cursor-not-allowed hover:ring-2 hover:ring-(--background-primary)/30`}
              aria-label="Previous"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canRight}
              className={`group flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition-all duration-300 hover:bg-(--background-primary) hover:border-transparent hover:scale-105 active:scale-90 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:bg-white/5 disabled:cursor-not-allowed hover:ring-2 hover:ring-(--background-primary)/30`}
              aria-label="Next"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          className="mt-14"
          ref={containerRef}
          style={{ clipPath: "polygon(0 0, 100vw 0, 100vw 100%, 0 100%)" }}
        >
          <motion.div
            className="flex gap-8"
            animate={{ x: -index * (CARD_WIDTH + GAP) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {cities.map((c) => (
              <div
                key={c.id}
                data-city-card
                className="group relative shrink-0 cursor-pointer transition-[opacity,transform] duration-700 ease-out"
                style={{ width: CARD_WIDTH }}
              >
                <div className="relative aspect-4/5 w-full overflow-hidden rounded-4xl">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                  <div className="absolute right-4 top-4 z-10">
                    <div className="relative">
                      <div className="absolute right-0 top-0 h-12 w-12 rounded-full bg-(--background-primary) opacity-0 blur-md transition-all duration-500 ease-out group-hover:opacity-100 group-hover:blur-0" />
                      <div className="relative flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-(--background-primary) opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-medium text-white">{c.name}</h3>
                    <p className="mt-2 text-sm text-white/80 font-light">
                      {formatListings(c.listings)} Listings
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
