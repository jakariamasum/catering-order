"use client";

import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSelectInputProps {
  name: string;
  label?: string;
}

const timeOptions: string[] = [];
for (let hour = 0; hour < 24; hour++) {
  for (let minute = 0; minute < 60; minute += 30) {
    const h = hour % 12 || 12;
    const m = minute.toString().padStart(2, "0");
    const period = hour < 12 ? "AM" : "PM";
    timeOptions.push(`${h}:${m} ${period}`);
  }
}

const GCTimeSelect = ({ name, label }: TimeSelectInputProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedTime = watch(name);

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <Select
        value={selectedTime || ""}
        onValueChange={(value) => setValue(name, value)}
      >
        <SelectTrigger
          className={cn(
            "text-xs sm:text-sm h-9 sm:h-10 w-full",
            errors[name] && "border-red-500"
          )}
        >
          <SelectValue placeholder="Select a time">{selectedTime}</SelectValue>
        </SelectTrigger>

        <SelectContent>
          {timeOptions.map((time) => (
            <SelectItem key={time} value={time} className="text-xs sm:text-sm">
              {time}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errors[name] && (
        <p className="text-xs text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
export default GCTimeSelect;
