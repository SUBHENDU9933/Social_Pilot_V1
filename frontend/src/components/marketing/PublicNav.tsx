"use client";

import Link from "next/link";
import { useState } from "react";
import { Plane, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PublicNav() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-[#F8FBFF]/75 border-b border-[#0F2D52]/8"
      data-testid="public-nav"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group" data-testid="brand-logo">
          <div className="relative w-9 h-9 rounded-lg bg-[#0F2D52] grid place-items-center overflow-hidden">
            <Plane className="w-5 h-5 text-[#FF7A1A] -rotate-45 transition-transform group-hover:rotate-0" />
            <div className="absolute inset-0 radar-glow opacity-60" />
          </div>
          <div className="leading-none">
            <p className="font-sora font-extrabold text-[#0F2D52] tracking-tight">
              PostPilot<span className="text-[#FF7A1A]">.</span>AI
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#4DA8FF] mt-0.5">
              Autopilot for Social
            </p>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#0F2D52]/80">
          <Link href="/#features" className="hover:text-[#0F2D52] transition" data-testid="nav-features">Features</Link>
          <Link href="/#integrations" className="hover:text-[#0F2D52] transition" data-testid="nav-integrations">Integrations</Link>
          <Link href="/pricing" className="hover:text-[#0F2D52] transition" data-testid="nav-pricing">Pricing</Link>
          <Link href="/about" className="hover:text-[#0F2D52] transition" data-testid="nav-about">About</Link>
          <Link href="/contact" className="hover:text-[#0F2D52] transition" data-testid="nav-contact">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" data-testid="nav-login">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link href="/auth/signup" data-testid="nav-start-trial">
            <Button size="sm">Start Free Trial</Button>
          </Link>
        </div>

        <button
          className="md:hidden h-10 w-10 grid place-items-center rounded-md text-[#0F2D52]"
          onClick={() => setOpen((v) => !v)}
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className={cn("md:hidden overflow-hidden transition-all", open ? "max-h-96" : "max-h-0")}>
        <div className="px-6 py-4 flex flex-col gap-3 text-sm font-medium text-[#0F2D52]">
          <Link href="/#features" onClick={() => setOpen(false)}>Features</Link>
          <Link href="/#integrations" onClick={() => setOpen(false)}>Integrations</Link>
          <Link href="/pricing" onClick={() => setOpen(false)}>Pricing</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
          <div className="flex gap-2 pt-2">
            <Link href="/auth/login" className="flex-1"><Button variant="outline" className="w-full">Sign in</Button></Link>
            <Link href="/auth/signup" className="flex-1"><Button className="w-full">Start Trial</Button></Link>
          </div>
        </div>
      </div>
    </header>
  );
}
