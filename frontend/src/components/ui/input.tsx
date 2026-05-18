import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md border border-[#0F2D52]/15 bg-white px-3 py-2 text-sm text-[#0F2D52] placeholder:text-[#0F2D52]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DA8FF] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-md border border-[#0F2D52]/15 bg-white px-3 py-2 text-sm text-[#0F2D52] placeholder:text-[#0F2D52]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4DA8FF] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-y",
        className,
      )}
      {...props}
    />
  ),
);
Textarea.displayName = "Textarea";

export { Input, Textarea };
