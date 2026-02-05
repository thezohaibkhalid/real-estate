"use client";
import Image from "next/image";
import "@/styles/navbar.css";
import Link from "next/link";
import MaskButton from "./MaskButton";
import { useState } from "react";
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/properties", label: "Properties" },
  // { href: "/blogs", label: "Blogs" },
  // { href: "/pages", label: "Pages" },
]
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }
  return (
    <header className="gradient-nav">
      <nav className="max-w-[1300px] mx-auto flex justify-between items-center h-20 mt-4  px-[2.5%]">
        <div>
          <Image src="/icons/real-estate.svg" alt="logo" width={128} height={128} />
        </div>
        <div className="flex xl:gap-14 lg:gap-10 gap-8 md:flex hidden">
          {navLinks.map((link) => (
            <Link href={link.href} className="text-white hover:text-[var(--background-primary)] duration-400 transition-colors font-light text-lg tracking-tight" key={link.href}>{link.label}</Link>
          ))}
        </div>
        <div className="md:flex hidden">
          <MaskButton href="/contact" label="Contact" variant="mask1"  className="py-4 px-9 " spanClass="text-lg font-semibold" roundedClass="rounded-full" reverse={true} />
        </div>
        <button
            id="nav-icon1"
            className={`cursor-pointer md:hidden block z-[999]  ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
      </nav>
      <div 
        className={`fixed inset-0 bg-white z-50 overflow-hidden transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center h-20 px-[2.5%] border-b border-gray-100">
          <Image src="/icons/real-estate-dark.svg" alt="logo" width={128} height={128} />
          
        </div>
        <div className="flex flex-col gap-6 px-[2.5%] pt-8">
          {navLinks.map((link, index) => (
            <Link 
              href={link.href} 
              className={`text-black hover:text-[var(--background-primary)] transition-all font-normal text-2xl tracking-tight ${
                isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{ transitionDelay: isOpen ? `${index * 75}ms` : '0ms' }}
              key={link.href}
              onClick={toggleMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}

export default Navbar;