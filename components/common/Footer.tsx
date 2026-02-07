"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Instagram, Palette, Twitter, Facebook, Youtube, MapPin } from "lucide-react";
import { isExactActive } from "@/utils/isActiveLink";
import { cn } from "@/utils/isActiveLink";
import { usePathname } from "next/navigation";
const DB_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/mbhstudioo", icon: Instagram },
  { name: "Behance", href: "https://www.behance.net/mbhstudioo", icon: Palette },
  { name: "Twitter", href: "https://x.com/mbhstudioo", icon: Twitter },
  { name: "Facebook", href: "https://www.facebook.com/mbhstudioo/", icon: Facebook },
  { name: "YouTube", href: "https://www.youtube.com/@mbhstudioo", icon: Youtube },
];

const pagesLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Properties", href: "/properties" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch(`${DB_URL}/email/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      if (res.ok) setEmail("");
    } catch (err) {
      console.error(err);
      setMessage("Failed to subscribe. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="text-slate-700">
      <div className="container mx-auto px-6 pt-16 pb-10 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-10">
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <Image
                src="/icons/real-estate-dark.svg"
                alt="logo"
                width={140}
                height={56}
                priority={false}
              />
            </Link>

            <p className="text-base leading-relaxed text-[#6b7280] max-w-xs">
              PropertyPalace is a real estate firm based in Faisalabad, offering a full
              range of services.
            </p>

            <div className="flex space-x-6 pt-2">
              {socialLinks.map(({ name, href, icon: Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-900 transition hover:text-[var(--background-primary)] hover:scale-110"
                  aria-label={name}
                >
                  <Icon className="h-8 w-8" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-thin">Pages</h3>
            <div className="space-y-3 text-base text-[#6b7280]">
              {pagesLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn("block w-fit transition hover:text-[var(--background-primary)]", isExactActive(pathname, l.href) && "text-[var(--background-primary)]")}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-thin">Get in Touch</h3>
            <div className="space-y-4 text-base">
              <div>
                <address className="mt-1 text-[#6b7280] not-italic">
                  Plot No. 123, Sector 123, Faisalabad Pakistan
                  <br />
                  +91 9876543210
                </address>
              </div>
              <div>
                <div className="mt-1 space-y-1 text-[#6b7280]">
                  <p>contact@propertypalace.com</p>
                  <p>+92 315 8860962</p>
                  <p>+92 303 7074418</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-thin">Subscribe Now</h3>
            <p className="text-base text-[#6b7280]">
              Get the latest news, articles, and resources, sent to your inbox weekly.
            </p>{" "}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-md"
            >
              <input
                className="w-full py-2 bg-transparent border-b text-gray-500 border-gray-400 placeholder-gray-400 focus:outline-none focus:border-black text-base"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
              <button
                disabled={isLoading}
                type="submit"
                className="px-6 cursor-pointer py-2.5 border border-gray-500 text-base text-gray-500 rounded-full hover:bg-[var(--background-primary)] hover:border-transparent hover:ring-2 hover:ring-[var(--background-primary)]/30 hover:text-white transition-all shrink-0"
              >
                {isLoading ? "Subscribing..." : "Subscribe"}
              </button>
            </form>

            {message && (
              <span
                className={`text-base ${
                  message.includes("success") ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </span>
            )}

            <button
              className="px-6 -pointer py-2.5 border border-gray-400 text-base text-gray-500 rounded-full hover:bg-[var(--background-primary)] hover:border-transparent hover:text-white transition-all shrink-0 w-full flex items-center justify-center gap-2"
              onClick={() =>
                window.open("https://maps.app.goo.gl/d9Dv5EyzVNTsavYSA", "_blank")
              }
            >
              View on Google Maps <MapPin className="inline-block ms-2 h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-20 h-px w-full bg-slate-200" />

        <div className="pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-base text-[#6b7280]">
          <span>© {new Date().getFullYear()} RealtiFye. All rights reserved.</span>
          <span>By Bitbuilder Productions.</span>
        </div>
      </div>
    </footer>
  );
}
