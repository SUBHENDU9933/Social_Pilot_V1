import { Facebook, Instagram, Linkedin, Youtube, MapPin, ImageIcon, Twitter } from "lucide-react";

const items = [
  { name: "Facebook", icon: Facebook },
  { name: "Instagram", icon: Instagram },
  { name: "LinkedIn", icon: Linkedin },
  { name: "Pinterest", icon: ImageIcon },
  { name: "Google Business", icon: MapPin },
  { name: "YouTube", icon: Youtube },
  { name: "X", icon: Twitter },
];

export function IntegrationsBand() {
  return (
    <section
      id="integrations"
      className="bg-[#EAF4FF] border-y border-[#0F2D52]/8 py-10"
      data-testid="integrations-band"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#0F2D52]/60 font-semibold text-center mb-8">
          Pilot every platform from one cockpit
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {items.map((it) => (
            <div
              key={it.name}
              className="flex items-center gap-2 text-[#0F2D52]/80 hover:text-[#0F2D52] transition opacity-90"
              data-testid={`integration-chip-${it.name.toLowerCase().replace(" ", "-")}`}
            >
              <it.icon className="w-5 h-5" />
              <span className="font-semibold">{it.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
