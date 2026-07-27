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
        "px-5 py-2.5 rounded-full font-semibold transition-all duration-200",
        variant === "primary" &&
          "bg-brand text-white hover:bg-brand-dark shadow-lg shadow-brand/25 disabled:opacity-50",
        variant === "danger" &&
          "bg-red-500 text-white hover:bg-red-600 disabled:opacity-50",
        variant === "outline" &&
          "border-2 border-brand text-brand hover:bg-brand/10 disabled:opacity-50",
        variant === "ghost" && "text-brand hover:bg-brand/10",
        disabled && "cursor-not-allowed",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center">
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </span>
      ) : (
        children
      )}
    </button>
  );
}
