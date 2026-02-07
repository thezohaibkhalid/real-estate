import { usePathname } from "next/navigation";

type ClassValue = string | number | boolean | undefined | null | { [key: string]: boolean } | ClassValue[];

export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === "string") {
      classes.push(input);
    } else if (typeof input === "object") {
      if (Array.isArray(input)) {
        const inner = cn(...input);
        if (inner) classes.push(inner);
      } else {
        for (const key in input) {
          if (input[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.filter(Boolean).join(" ");
}



const cleanPath = (p: string) =>
  (p?.split("?")[0]?.split("#")[0] || "/").replace(/\/$/, "") || "/";

export const isExactActive = (pathname: string, href?: string) => {
  if (!href) return false;
  return cleanPath(pathname) === cleanPath(href);
};