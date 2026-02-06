"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
      "https://images.unsplash.com/photo-1542125703092-6a97a3f65b23?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: "chi",
    name: "Chicago",
    listings: 612,
    image:
      "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1600&q=80",
  },
];

function formatListings(n: number) {
  return n.toLocaleString("en-US");
}

export default function PopularCities({
  cities = DEMO_CITIES,
  title = "Popular Cities",
}: {
  cities?: City[];
  title?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const step = useMemo(() => 420, []);

  const updateButtons = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(left > 4);
    setCanRight(left < max - 4);
  }, []);

  const scrollBy = useCallback(
    (dir: "left" | "right") => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollTo({
        left: el.scrollLeft + (dir === "left" ? -step : step),
        behavior: "smooth",
      });
    },
    [step]
  );

  return (
    <section className="w-full bg-[#0b0c10]">
      <div className="mx-auto w-full max-w-[1300px] px-4 py-20 sm:px-6">
        <div className="flex items-center justify-between gap-6">
          <h2 className="text-[54px] font-light tracking-tight text-white sm:text-[62px]">
            {title}
          </h2>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollBy("left")}
              disabled={!canLeft}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white/90 transition hover:bg-white/10 disabled:opacity-30"
              aria-label="Previous"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => scrollBy("right")}
              disabled={!canRight}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/70 text-white/90 transition hover:bg-white/10 disabled:opacity-30"
              aria-label="Next"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-14">
          <div
            ref={scrollerRef}
            onScroll={updateButtons}
            onLoad={updateButtons as any}
            className="no-scrollbar flex gap-16 overflow-x-auto scroll-smooth pb-6"
          >
            {cities.map((c) => (
              <div key={c.id} className="min-w-[240px] shrink-0 text-center">
                <div className="mx-auto h-[250px] w-[250px] overflow-hidden rounded-full bg-white/5">
                  <div className="relative h-full w-full">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      sizes="250px"
                      className="object-cover"
                      priority={false}
                    />
                  </div>
                </div>

                <div className="mt-8 text-[28px] font-light text-white">
                  {c.name}
                </div>
                <div className="mt-2 text-sm font-light text-white/70">
                  {formatListings(c.listings)} Listing
                </div>
              </div>
            ))}
          </div>

          <style jsx global>{`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
