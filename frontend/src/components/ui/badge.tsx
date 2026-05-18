import * as React from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  default: "bg-accent-blue/10 text-accent-blue border-accent-blue/15",
  accent: "bg-brand/10 text-brand border-brand/20",
  success: "bg-success-soft text-success border-success/20",
  warning: "bg-warning-soft text-warning border-warning/20",
  danger: "bg-red-50 text-red-600 border-red-200",
  navy: "bg-secondary text-foreground border-border",
  outline: "bg-transparent text-muted-foreground border-border",
} as const;

export function Badge({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: keyof typeof variantStyles }) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
