"use client";

import { OrderFormData } from "@/types";
import { createContext, useContext, useState, type ReactNode } from "react";

type OrderContextType = {
  formData: OrderFormData;
  updateFormData: (data: Partial<OrderFormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  totalPrice: number;
  calculateTotalPrice: () => number;
};

const defaultFormData: OrderFormData = {
  selectedItems: [],
  numberOfPeople: 1,
  contactInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  deliveryAddress: {
    street: "",
    city: "",
    state: "",
    zipCode: "",
  },
  specialInstructions: "",
  eventDate: "",
  eventTime: "",
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<OrderFormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(formData);
  const updateFormData = (data: Partial<OrderFormData>) => {
    setFormData((prev) => {
      const newData = { ...prev, ...data };
      return newData;
    });
  };

  const calculateTotalPrice = () => {
    const itemsTotal = formData.selectedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const perPersonCost = 5;
    const peopleCost = formData.numberOfPeople * perPersonCost;

    const newTotal = itemsTotal + peopleCost;
    setTotalPrice(newTotal);
    return newTotal;
  };

  return (
    <OrderContext.Provider
      value={{
        formData,
        updateFormData,
        currentStep,
        setCurrentStep,
        totalPrice,
        calculateTotalPrice,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
