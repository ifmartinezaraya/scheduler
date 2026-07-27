import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "danger" | "ghost";
  isLoading?: boolean;
}

export function Button({
  children,
  variant = "primary",
  className,
  disabled,
  isLoading,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "px-7 py-3 rounded-full text-sm font-semibold uppercase tracking-[0.12em] transition-all duration-200",
        variant === "primary" &&
          "bg-coffee-900 text-coffee-50 hover:bg-coffee-ink disabled:opacity-40",
        variant === "danger" &&
          "bg-red-700 text-white hover:bg-red-800 disabled:opacity-40",
        variant === "outline" &&
          "border border-coffee-900 text-coffee-900 hover:bg-coffee-900 hover:text-coffee-50 disabled:opacity-40",
        variant === "ghost" && "text-coffee-600 hover:text-coffee-900",
        disabled && "cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
