"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function GetInTouch() {
  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-[#0b0c10]">
      <div className="absolute inset-0 h-full w-full overflow-hidden">
        <motion.div
          className="relative h-full w-full"
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 10,
            ease: "easeOut",
            repeat: Infinity,
            repeatType: "reverse", 
          }}
        >
          <Image
            src="/images/getintouch.png"
            alt="Luxury Property"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </div>

      <div className="relative z-10 flex h-full w-full flex-col items-start justify-center px-[4%] sm:px-12 md:px-34 lg:px-42">
        <div className="max-w-4xl">
          <motion.h2
            className="font-light text-white text-[42px] leading-[1.1] sm:text-[56px] md:text-[72px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: false }} 
          >
            Are you looking to buy
            <br />
            or rent a property?
          </motion.h2>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: false }}
          >
            <button
              type="button"
              className="group flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-8 py-4 text-lg text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95"
            >
              Get In Touch
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

