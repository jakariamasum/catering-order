import { IForm } from "@/types";
import { useFormContext } from "react-hook-form";

const GCInput = ({
  name,
  label,
  type = "text",
  required = true,
  placeholder,
  ...props
}: IForm) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const error = errors?.[name]?.message as string | undefined;

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        {...register(name)}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`block w-full rounded-md border px-3 py-2 text-sm 
          bg-white text-gray-900 shadow-sm placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
          disabled:cursor-not-allowed disabled:opacity-50
          ${
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300"
          }
        `}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default GCInput;
