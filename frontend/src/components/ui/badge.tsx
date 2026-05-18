import * as React from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-[#4DA8FF]/15 text-[#4DA8FF] border-[#4DA8FF]/20",
  accent: "bg-[#FF7A1A]/15 text-[#FF7A1A] border-[#FF7A1A]/30",
  success: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  warning: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  danger: "bg-red-500/15 text-red-500 border-red-500/30",
  navy: "bg-[#0F2D52]/10 text-[#0F2D52] border-[#0F2D52]/20",
  outline: "bg-transparent text-[#DDEBFF] border-[#4DA8FF]/25",
} as const;

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof variantStyles }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
