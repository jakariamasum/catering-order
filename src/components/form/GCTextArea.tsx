import { cn } from "@/lib/cn";
import { IForm } from "@/types";
import { type TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const GCTextArea = ({
  name,
  label,
  required = false,
  placeholder,
  ...props
}: IForm) => {
  const { register } = useFormContext();
  return (
    <div>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        {...register(name)}
        id={name}
        name={name}
        placeholder={placeholder}
        className={cn(
          "mt-2 flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        )}
        {...props}
      />
    </div>
  );
};

export default GCTextArea;
