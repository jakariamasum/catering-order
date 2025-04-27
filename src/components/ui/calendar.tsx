"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import Button from "./button";

interface CalendarProps {
  mode?: "single" | "range" | "multiple";
  selected?: Date | Date[] | undefined;
  onSelect?: (date: Date | undefined) => void;
  className?: string;
  initialFocus?: boolean;
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  className,
  initialFocus,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);

  useEffect(() => {
    if (initialFocus && !focusedDate) {
      setFocusedDate(selected instanceof Date ? selected : new Date());
    }
  }, [initialFocus, selected, focusedDate]);

  const handleDateSelect = (date: Date) => {
    if (onSelect) {
      onSelect(date);
    }
  };

  const isSelected = (date: Date) => {
    if (!selected) return false;

    if (selected instanceof Date) {
      return date.toDateString() === selected.toDateString();
    }

    if (Array.isArray(selected)) {
      return selected.some(
        (selectedDate) => date.toDateString() === selectedDate.toDateString()
      );
    }

    return false;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isDateSelected = isSelected(date);
      const isDateToday = isToday(date);

      days.push(
        <button
          key={day}
          type="button"
          className={cn(
            "h-9 w-9 rounded-md p-0 font-normal aria-selected:opacity-100",
            isDateToday && "bg-accent text-accent-foreground",
            isDateSelected && "bg-primary text-primary-foreground",
            !isDateSelected &&
              !isDateToday &&
              "hover:bg-accent hover:text-accent-foreground"
          )}
          onClick={() => handleDateSelect(date)}
          aria-selected={isDateSelected}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  return (
    <div className={cn("p-3", className)}>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          onClick={prevMonth}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Previous month</span>
        </Button>
        <div className="font-medium">
          {currentDate.toLocaleDateString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>
        <Button
          variant="outline"
          className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          onClick={nextMonth}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Next month</span>
        </Button>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1 text-center text-sm">
        <div className="text-muted-foreground">S</div>
        <div className="text-muted-foreground">M</div>
        <div className="text-muted-foreground">T</div>
        <div className="text-muted-foreground">W</div>
        <div className="text-muted-foreground">T</div>
        <div className="text-muted-foreground">F</div>
        <div className="text-muted-foreground">S</div>
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center">
        {renderDays()}
      </div>
    </div>
  );
}
