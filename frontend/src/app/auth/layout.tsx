import Link from "next/link";
import { Plane } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex bg-bg-light" data-testid="auth-layout">
      {/* Form side */}
      <div className="flex-1 flex flex-col px-6 md:px-12 py-10">
        <Link href="/" className="flex items-center gap-2.5 w-fit" data-testid="auth-brand-link">
          <div className="w-9 h-9 rounded-lg bg-[#0F2D52] grid place-items-center">
            <Plane className="w-5 h-5 text-[#FF7A1A] -rotate-45" />
          </div>
          <span className="font-sora font-extrabold text-[#0F2D52]">
            PostPilot<span className="text-[#FF7A1A]">.</span>AI
          </span>
        </Link>
        <div className="flex-1 grid place-items-center">{children}</div>
        <p className="text-xs text-[#0F2D52]/50 text-center">
          © {new Date().getFullYear()} PostPilot AI · All rights reserved
        </p>
      </div>
      {/* Visual side */}
      <div className="hidden lg:block w-[44%] relative bg-[#081826] overflow-hidden">
        <div className="absolute inset-0 grid-faint-bg-dark opacity-40" />
        <div className="absolute inset-0 radar-glow opacity-80" />
        <Image
          src="https://static.prod-images.emergentagent.com/jobs/16a0eb61-f58d-4d17-8b63-8e68a30b7015/images/0e42baeea15a99fa14ff0b0b1d7925a1508b774caea86f898fa7bdce8acfa988.png"
          alt="Aviation radar graphic"
          fill
          className="object-contain opacity-50 mix-blend-screen"
          priority
        />
        <div className="absolute bottom-12 left-12 right-12 text-[#DDEBFF]">
          <p className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">
            Flight Crew
          </p>
          <h2 className="font-sora font-black text-3xl mt-3 leading-tight">
            One pilot. <br /> Every platform. <br /> One click.
          </h2>
          <p className="text-sm text-[#DDEBFF]/70 mt-4 max-w-sm">
            Trusted by 8,400+ marketing teams to publish ~2M posts every month.
          </p>
        </div>
      </div>
    </main>
  );
}
