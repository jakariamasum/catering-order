import type React from "react";
import { cn } from "@/lib/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  children: React.ReactNode;
}

const Button = ({
  className,
  variant = "primary",
  size = "default",
  children,
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantStyles = {
    primary:
      "bg-teal-600 text-white hover:bg-white hover:text-teal-600 border border-teal-500",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200",
    outline:
      "px-4 py-2 text-sm font-medium border rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-teal-800 border-teal-800 hover:bg-teal-800 hover:text-white",
    ghost: "bg-transparent hover:bg-slate-100 text-slate-900",
    link: "bg-transparent underline-offset-4 hover:underline text-slate-900 p-0 h-auto",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizeStyles = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
