import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

interface OrderStepperProps {
  currentStep: number;
  steps: string[];
}

const OrderStepper = ({ currentStep, steps }: OrderStepperProps) => {
  return (
    <div className="flex justify-center">
      <ol className="flex items-center w-full max-w-3xl">
        {steps.map((step, index) => (
          <li
            key={index}
            className={cn(
              "flex items-center",
              index < steps.length - 1 ? "w-full" : ""
            )}
          >
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 shrink-0",
                  currentStep > index
                    ? "bg-teal-600 border-teal-600 text-white"
                    : currentStep === index
                    ? "border-teal-600 text-teal-600"
                    : "border-gray-300 text-gray-300"
                )}
              >
                {currentStep > index ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-1",
                  currentStep >= index ? "text-teal-600" : "text-gray-400"
                )}
              >
                {step}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "w-full h-0.5 mx-2",
                  currentStep > index ? "bg-teal-600" : "bg-gray-200"
                )}
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};
export default OrderStepper;
