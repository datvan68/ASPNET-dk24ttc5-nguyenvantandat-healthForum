import * as React from "react";
import Link from "next/link";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", href, children, ...props },
    ref
  ) => {
    const baseColours = {
      primary: "bg-brand-500 text-white hover:bg-brand-600 border border-transparent",
      secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 border border-transparent",
      outline: "bg-transparent text-slate-700 hover:bg-slate-50 border border-slate-300",
      ghost: "bg-transparent text-slate-700 hover:bg-slate-100 border border-transparent",
    };

    const baseSizes = {
      sm: "h-8 px-3 py-1 text-xs rounded",
      md: "h-10 px-4 py-2 text-sm rounded-md",
      lg: "h-12 px-5 py-2 text-base rounded-md",
    };

    const classes = cn(
      "inline-flex items-center justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
      baseColours[variant],
      baseSizes[size],
      className
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
