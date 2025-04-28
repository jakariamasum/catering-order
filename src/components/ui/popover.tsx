"use client";

import {
  Dispatch,
  type ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/cn";

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within a PopoverProvider");
  }
  return context;
}

interface PopoverProps {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function Popover({ children, open, setOpen }: PopoverProps) {
  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative">{children}</div>
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps {
  asChild?: boolean;
  children: ReactNode;
}

export function PopoverTrigger({
  asChild = false,
  children,
}: PopoverTriggerProps) {
  const { open, setOpen } = usePopover();

  const handleClick = () => {
    setOpen(!open);
  };

  if (asChild) {
    return (
      <div onClick={handleClick} className="cursor-pointer">
        {children}
      </div>
    );
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

interface PopoverContentProps {
  className?: string;
  children: ReactNode;
  align?: "start" | "center" | "end";
}

export function PopoverContent({
  className,
  children,
  align = "center",
  ...props
}: PopoverContentProps) {
  const { open, setOpen } = usePopover();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        {
          "left-0": align === "start",
          "left-1/2 -translate-x-1/2": align === "center",
          "right-0": align === "end",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
