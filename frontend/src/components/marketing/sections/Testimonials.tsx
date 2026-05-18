"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "PostPilot consolidated five tools into one. Our marketing team ships 3x more content with half the meetings.",
    name: "Aisha Patel",
    role: "Head of Growth, Northwind",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHNtaWxpbmd8ZW58MHx8fHwxNzc5MTI3ODMxfDA&ixlib=rb-4.1.0&q=85",
  },
  {
    quote:
      "The calendar drag-drop is so good our junior managers handle full content weeks alone now. It just works.",
    name: "Marcus Chen",
    role: "Founder, Atlas Studio",
    img: "https://images.unsplash.com/photo-1699899657680-421c2c2d5064?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA2MjJ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHNtaWxpbmd8ZW58MHx8fHwxNzc5MTI3ODMxfDA&ixlib=rb-4.1.0&q=85",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 md:py-32 bg-[#F8FBFF]" data-testid="testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl">
          <span className="text-xs uppercase tracking-[0.3em] text-[#4DA8FF] font-bold">
            Pilot Reports
          </span>
          <h2 className="font-sora font-black tracking-tighter text-3xl md:text-5xl text-[#0F2D52] mt-3">
            Trusted by marketers who hate babysitting tools.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-14">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl border border-[#0F2D52]/10 p-8 md:p-10 flex flex-col"
            >
              <Quote className="w-7 h-7 text-[#FF7A1A]" />
              <p className="mt-5 text-lg md:text-xl text-[#0F2D52] leading-relaxed font-medium flex-1">
                "{t.quote}"
              </p>
              <div className="mt-7 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src={t.img} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-[#0F2D52]">{t.name}</p>
                  <p className="text-sm text-[#0F2D52]/60">{t.role}</p>
                </div>
                <div className="ml-auto flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FF7A1A] text-[#FF7A1A]" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
