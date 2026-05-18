import Link from "next/link";
import { Plane } from "lucide-react";

export function PublicFooter() {
  return (
    <footer
      className="bg-[#0F2D52] text-[#DDEBFF] relative overflow-hidden"
      data-testid="public-footer"
    >
      <div className="absolute inset-0 grid-faint-bg-dark opacity-40" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 relative">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-[#FF7A1A] grid place-items-center">
                <Plane className="w-5 h-5 text-white -rotate-45" />
              </div>
              <span className="font-sora font-extrabold text-lg">
                PostPilot<span className="text-[#FF7A1A]">.</span>AI
              </span>
            </div>
            <p className="text-sm text-[#DDEBFF]/70 max-w-sm">
              Fly your social media on autopilot. One pilot. Every platform. One click.
            </p>
            <p className="text-xs text-[#4DA8FF] mt-6 uppercase tracking-[0.25em]">
              Made for marketers · 2026
            </p>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: "Features", href: "/#features" },
              { label: "Integrations", href: "/#integrations" },
              { label: "Pricing", href: "/pricing" },
              { label: "Changelog", href: "/#" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "About", href: "/about" },
              { label: "Blog", href: "/#" },
              { label: "Contact", href: "/contact" },
              { label: "Careers", href: "/#" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              { label: "Help Center", href: "/#" },
              { label: "API docs", href: "/#" },
              { label: "Security", href: "/#" },
              { label: "Status", href: "/#" },
            ]}
          />
        </div>

        <div className="border-t border-[#DDEBFF]/10 mt-14 pt-6 flex flex-col md:flex-row justify-between gap-4 text-xs text-[#DDEBFF]/60">
          <p>© {new Date().getFullYear()} PostPilot AI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/#">Privacy</Link>
            <Link href="/#">Terms</Link>
            <Link href="/#">DPA</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.25em] text-[#4DA8FF] mb-4">{title}</p>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-[#FF7A1A] transition">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
