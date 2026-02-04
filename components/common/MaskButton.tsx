"use client";

import Link from "next/link";
import "@/styles/mask_button.css";

const VARIANTS = {
  mask1: { rootClass: "mask-btn--mask1", steps: 22 },
  mask2: { rootClass: "mask-btn--mask2", steps: 29 },
  mask3: { rootClass: "mask-btn--mask3", steps: 70 },
};

export default function MaskButton({
  href = "#",
  label = "BUTTON",
  variant = "mask2",
  reverse = false, 

  className = "px-6 py-2", 
  // wrapClassName = "h-[50px] min-w-[140px]", 
  roundedClass = "rounded-xl",
  spanClass = "text-[12px] font-bold",
  bgClass = "bg-[var(--background-primary)]",
  textClass = "text-white", 
  hoverTextClass = "text-white",
}) {
  const v = VARIANTS[variant as keyof typeof VARIANTS] || VARIANTS.mask2;

  return (
    <Link
      href={href}
      className={[
        "mask-btn group inline-flex", 
        "relative overflow-hidden",
        "border border-white hover:border-[var(--background-primary)] group-hover:border-[var(--background-primary)]",
        "transition-all duration-500 tracking-[1px]",
        "items-stretch", 
        roundedClass,
        // wrapClassName,
        v.rootClass,
        reverse ? "mask-btn--reverse" : "",
      ].join(" ")}
      style={{ "--mask-steps": v.steps } as React.CSSProperties}
    >
      <span
        className={[
          "mask-btn__label",
          "absolute inset-0 z-[2] flex items-center justify-center",
          "pointer-events-none",
          "px-3", 
          "text-center leading-tight",
          "whitespace-nowrap", 
          "overflow-hidden text-ellipsis", 
          spanClass,
          textClass,
          hoverTextClass,
          "transition-colors duration-300",
        ].join(" ")}
        title={label} 
      >
        {label}
      </span>

      <span
        className={[
          "mask-btn__animated",
          "relative z-[1] w-[101%] h-full",
          "select-none cursor-pointer",
          "flex items-center justify-center",
          "text-center leading-tight",
            "whitespace-nowrap overflow-hidden text-ellipsis", 
          "min-w-0",  
          bgClass,
          spanClass,
          textClass,
          hoverTextClass,
          "transition-colors duration-300",
          className,
        ].join(" ")}
        title={label}
      >
        {label}
      </span>
    </Link>
  );
}