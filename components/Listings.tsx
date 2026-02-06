"use client";

import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Home,
  MapPin,
  Search as SearchIcon,
  SlidersHorizontal,
} from "lucide-react";

type Listing = {
  id: string;
  title: string;
  location: string;
  type: "House" | "Apartment" | "Villa" | "Studio";
  imageUrl: string;
  badge: string;
  metaRight: string;
};

const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Serenity Haven",
    location: "Florida",
    type: "House",
    imageUrl:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1600&q=80",
    badge: "Featured",
    metaRight: "2500 Sq.Ft",
  },
  {
    id: "2",
    title: "Riverside Villa",
    location: "Nevada, Miami",
    type: "Villa",
    imageUrl:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
    badge: "Open House",
    metaRight: "3 Beds • 2 Baths",
  },
  {
    id: "3",
    title: "Serene Suburban",
    location: "San Diego",
    type: "House",
    imageUrl:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",
    badge: "New",
    metaRight: "1800 Sq.Ft",
  },
  {
    id: "4",
    title: "Skyline Studio",
    location: "New York",
    type: "Studio",
    imageUrl:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1600&q=80",
    badge: "Verified",
    metaRight: "1 Bed • 1 Bath",
  },
  {
    id: "5",
    title: "Urban Apartment",
    location: "Chicago",
    type: "Apartment",
    imageUrl:
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=1600&q=80",
    badge: "Hot",
    metaRight: "1200 Sq.Ft",
  },
];

const PROPERTY_OPTIONS = ["Properties", "Buy", "Rent"] as const;
const LOCATION_OPTIONS = [
  "Location",
  "Florida",
  "Nevada, Miami",
  "San Diego",
  "New York",
  "Chicago",
] as const;
const TYPE_OPTIONS = ["Types", "House", "Apartment", "Villa", "Studio"] as const;

const CONTROL_BASE =
  "rounded-full border border-neutral-200 bg-white shadow-sm transition hover:border-neutral-300";
const CONTROL_FOCUS =
  "focus-within:ring-2 focus-within:ring-[var(--background-primary)]/25 focus-within:border-[var(--background-primary)]";

function StyledDropdown({
  icon,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full md:flex-1">
        <button
          type="button"
          onClick={() => setOpen((s) => !s)}
          className={`flex justify-between w-full items-center gap-3 px-5 py-3 h-18 cursor-pointer ${CONTROL_BASE} ${CONTROL_FOCUS}`}
        >
        <div className="flex items-center gap-3">
        <span className={`text-neutral-500  ${open ? "text-[var(--background-primary)]" : ""}`}>
          {icon}
        </span>

        <div className="flex min-w-0 flex-1 flex-col items-start">
          <span className="truncate text-base font-light text-neutral-800">
            {value}
          </span>
        </div>

        </div>

        <ChevronDown
          className={`h-4 w-4 text-neutral-400 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <>
          <button
            aria-label="Close dropdown"
            className="fixed inset-0 z-10 cursor-default "
            onClick={() => setOpen(false)}
            type="button"
          />
          <div className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl xl:w-64">
            <div className="max-h-64 overflow-auto p-1">
              {options.map((opt) => {
                const selected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition
                      ${selected ? "bg-[var(--background-primary)]/10 text-[var(--background-primary)]" : "text-neutral-700 hover:bg-neutral-50"}`}
                  >
                    <span className="truncate">{opt}</span>
                    {selected && <Check className="h-4 w-4" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function Listings() {
  const [query, setQuery] = useState("");
  const [property, setProperty] =
    useState<(typeof PROPERTY_OPTIONS)[number]>("Properties");
  const [location, setLocation] =
    useState<(typeof LOCATION_OPTIONS)[number]>("Location");
  const [type, setType] = useState<(typeof TYPE_OPTIONS)[number]>("Types");

  const filtered = useMemo(() => {
    return MOCK_LISTINGS.filter((l) => {
      const matchesQuery =
        !query.trim() ||
        l.title.toLowerCase().includes(query.toLowerCase()) ||
        l.location.toLowerCase().includes(query.toLowerCase());

      const matchesLocation = location === "Location" ? true : l.location === location;
      const matchesType = type === "Types" ? true : l.type === type;

      return matchesQuery && matchesLocation && matchesType;
    });
  }, [query, location, type]);

  return (
    <section className="w-full bg-white">
      <div className="relative">
        <div className="pointer-events-none absolute left-0 right-0 md:top-0 top-[-200px] z-20">
          <div className="mx-auto w-full max-w-[1300px] px-4 sm:px-6 -translate-y-12 sm:-translate-y-14 md:-translate-y-16">
            <div className="pointer-events-auto rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl sm:p-5 py-10">
               
               
                <div className="flex flex-col gap-4 md:flex-col lg:flex-row lg:items-center py-4">
                    
                  <div className="flex flex-col gap-3 w-full md:w-full lg:w-1/2">
                    <div className={`flex items-center gap-3 px-3 py-4 md:py-4 ${CONTROL_BASE} ${CONTROL_FOCUS}`}>
                      <SearchIcon className="h-8 w-8 text-neutral-400" />
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for properties"
                        className="w-full bg-transparent text-base text-[var(--background-secondary)] outline-none placeholder:text-gray-400 font-light placeholder:text-[17px]"
                      />
                      <button
                        type="button"
                        className="hidden md:block rounded-full bg-[var(--background-primary)] px-7 text-base font-medium text-white shadow-sm transition hover:opacity-95 h-10"
                      >
                        Search
                      </button>
                    </div>
                    <button
                      type="button"
                      className="w-full rounded-full bg-[var(--background-primary)] px-7 py-3 text-base font-medium text-white shadow-sm transition hover:opacity-95 md:hidden"
                    >
                      Search
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 w-full md:flex-row md:w-full lg:w-1/2">
                    <StyledDropdown
                      icon={<Home className="h-4 w-4" />}
                      value={property}
                      onChange={(v) => setProperty(v as any)}
                      options={PROPERTY_OPTIONS}
                    />
                    <StyledDropdown
                      icon={<MapPin className="h-4 w-4" />}
                      value={location}
                      onChange={(v) => setLocation(v as any)}
                      options={LOCATION_OPTIONS}
                    />
                    <StyledDropdown
                      icon={<SlidersHorizontal className="h-4 w-4" />}
                      value={type}
                      onChange={(v) => setType(v as any)}
                      options={TYPE_OPTIONS}
                    />
                  </div>
                </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1300px] px-4 pb-10 pt-80 sm:px-6 sm:pt-60 md:pb-14 lg:pt-40 md:pt-58">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-1">
              <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl md:text-5xl lg:text-6xl">
                New Listings
              </h2>
            </div>
            <div className="hidden lg:block lg:col-span-1" />
            <div className="col-span-1  space-y-4">
              <p className="lg:text-[16px] text-[14px] leading-relaxed font-light  text-neutral-500 ">
                From chic urban apartments to serene countryside retreats. Start your search
                today and find the perfect place to call home.
              </p>
              <button
                type="button"
                className=" group/btn inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[var(--background-primary)] bg-transparent lg:px-6 px-4 lg:py-3 py-2 text-sm font-semibold text-[var(--background-primary)] shadow-sm transition-all duration-300 ease-out hover:bg-[var(--background-primary)] hover:text-white hover:shadow-lg hover:shadow-[var(--background-primary)]/25 active:scale-[0.98] sm:w-auto hover:scale-105"
              >
                Explore All 
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <article key={item.id} className="group">
                <div className="relative w-full overflow-hidden rounded-2xl bg-neutral-100 aspect-[16/10] sm:aspect-[16/9]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-base font-semibold text-neutral-900 sm:text-[17px]">
                      {item.title}
                    </h3>
                    <span className="shrink-0 text-sm font-medium text-[var(--background-primary)]">
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-1 flex items-center justify-between gap-4">
                    <p className="text-sm text-neutral-500">{item.location}</p>
                    <p className="shrink-0 text-sm text-neutral-500">{item.metaRight}</p>
                  </div>
                </div>
              </article>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full rounded-2xl border border-neutral-200 p-6 text-sm text-neutral-600">
                No listings found for these filters.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}


              {/* <span className="inline-block rounded-full bg-[var(--background-primary)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--background-primary)]">
                Featured Properties
              </span> */}