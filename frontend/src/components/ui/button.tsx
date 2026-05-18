import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#FF7A1A] text-white hover:bg-[#FF7A1A]/90 shadow-[0_6px_20px_-6px_rgba(255,122,26,0.55)]",
        secondary:
          "bg-[#0F2D52] text-[#F8FBFF] hover:bg-[#12283D]",
        outline:
          "border border-[#0F2D52]/15 bg-transparent hover:bg-[#EAF4FF] text-[#0F2D52]",
        ghost: "hover:bg-[#EAF4FF] text-[#0F2D52]",
        destructive:
          "bg-red-500 text-white hover:bg-red-500/90",
        link: "text-[#0F2D52] underline-offset-4 hover:underline",
        darkOutline:
          "border border-[#4DA8FF]/25 bg-transparent text-[#DDEBFF] hover:bg-[#4DA8FF]/10",
        dark: "bg-[#12283D] text-[#DDEBFF] hover:bg-[#12283D]/80 border border-[#4DA8FF]/15",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
