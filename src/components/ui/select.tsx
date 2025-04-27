"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

interface SelectContextType {
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelect() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be used within a SelectProvider");
  }
  return context;
}

interface SelectProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}

export function Select({
  defaultValue = "",
  value,
  onValueChange,
  children,
}: SelectProps) {
  const [selectValue, setSelectValue] = useState(value || defaultValue);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setSelectValue(value);
    }
  }, [value]);

  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setSelectValue(newValue);
    }
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{
        value: value !== undefined ? value : selectValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  className?: string;
  children?: ReactNode;
  placeholder?: string;
}

export function SelectTrigger({
  className,
  children,
  placeholder = "Select an option",
  ...props
}: SelectTriggerProps) {
  const { value, open, setOpen } = useSelect();

  return (
    <button
      type="button"
      role="combobox"
      aria-expanded={open}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      onClick={() => setOpen(!open)}
      {...props}
    >
      {children || <span>{value || placeholder}</span>}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

interface SelectContentProps {
  className?: string;
  children: ReactNode;
}

export function SelectContent({
  className,
  children,
  ...props
}: SelectContentProps) {
  const { open, setOpen } = useSelect();
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
        "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
      {...props}
    >
      <div className="max-h-[var(--radix-select-content-available-height)] overflow-auto">
        {children}
      </div>
    </div>
  );
}

interface SelectItemProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export function SelectItem({
  value,
  className,
  children,
  ...props
}: SelectItemProps) {
  const { value: selectedValue, onValueChange } = useSelect();
  const isSelected = selectedValue === value;

  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && <Check className="h-4 w-4" />}
      </span>
      {children}
    </div>
  );
}

interface SelectValueProps {
  placeholder?: string;
  children?: ReactNode;
}

export function SelectValue({ placeholder, children }: SelectValueProps) {
  const { value } = useSelect();

  return <>{value ? children : placeholder}</>;
}
