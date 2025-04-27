"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import OrderStepper from "./order-stepper";
import SummaryDashboard from "./steps/summary-dashboard";
import MenuSelection from "./steps/menu-selection";
import ContactInformation from "./steps/contact-information";
import OrderSuccess from "./steps/order-success";
import { useOrder } from "@/context/order-context";
import Button from "./ui/button";

const steps = [
  { title: "Summary", component: SummaryDashboard },
  { title: "Menu Selection", component: MenuSelection },
  { title: "Contact Information", component: ContactInformation },
  { title: "Order Complete", component: OrderSuccess },
];

export default function OrderWizard() {
  const { currentStep, setCurrentStep, formData, calculateTotalPrice } =
    useOrder();
  const [mounted, setMounted] = useState(false);

  // Hydration fix
  useEffect(() => {
    setMounted(true);

    const savedData = localStorage.getItem("cateringOrderData");
    const savedStep = localStorage.getItem("cateringOrderStep");

    if (savedData) {
      try {
        if (savedStep && Number.parseInt(savedStep) < 3) {
          setCurrentStep(Number.parseInt(savedStep));
        }
      } catch (e) {
        console.error("Error parsing saved step", e);
      }
    }
  }, [setCurrentStep]);

  useEffect(() => {
    if (mounted && currentStep < 3) {
      localStorage.setItem("cateringOrderStep", currentStep.toString());
    }
  }, [currentStep, mounted]);

  const CurrentStepComponent = steps[currentStep].component;

  const handleNext = () => {
    if (currentStep === 1) {
      calculateTotalPrice();
    }

    setCurrentStep(Math.min(currentStep + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold text-center text-teal-800 mb-8">
        Gourmet Catering Service
      </h1>

      <OrderStepper
        currentStep={currentStep}
        steps={steps.map((s) => s.title)}
      />

      <Card className="mt-8 shadow-lg border-teal-100">
        <CardContent className="p-6">
          <CurrentStepComponent />

          {currentStep < 3 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>

              <Button
                onClick={handleNext}
                className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-2"
                disabled={
                  currentStep === 1 &&
                  (formData.selectedItems.length === 0 ||
                    formData.numberOfPeople < 1)
                }
              >
                {currentStep === 2 ? "Submit Order" : "Continue"}{" "}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
