"use client";

import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Button from "../ui/button";
import { Calendar } from "../ui/calendar";

interface DatePickerInputProps {
  name: string;
  label?: string;
}

const GCDatePick = ({ name, label }: DatePickerInputProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedDate = watch(name);
  const [open, setOpen] = useState(false);

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

      <Popover open={open} setOpen={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal text-xs sm:text-sm h-9 sm:h-10",
              !selectedDate && "text-muted-foreground",
              errors[name] && "border-red-500"
            )}
          >
            <CalendarIcon className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            {selectedDate ? (
              format(new Date(selectedDate), "PPP")
            ) : (
              <span>Select date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate ? new Date(selectedDate) : undefined}
            onSelect={(date) => {
              if (date) {
                setValue(name, format(date, "yyyy-MM-dd"), {
                  shouldValidate: true,
                  shouldDirty: true,
                });
                setOpen(false);
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {errors[name] && (
        <p className="text-xs text-red-500">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};
export default GCDatePick;
