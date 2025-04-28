"use client";

import { useEffect, useState } from "react";
import { Check, Download, Home } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { useOrder } from "@/context/order-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Button from "../ui/button";

const OrderSuccess = () => {
  const { formData, totalPrice } = useOrder();
  const [orderNumber, setOrderNumber] = useState<string>("");

  useEffect(() => {
    const randomOrderNumber = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    setOrderNumber(randomOrderNumber);

    localStorage.removeItem("cateringOrderData");
    localStorage.removeItem("cateringOrderStep");

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-3 sm:space-y-4">
        <div className="mx-auto bg-teal-100 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
          <Check className="h-6 w-6 sm:h-8 sm:w-8 text-teal-600" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-teal-800">
          Order Confirmed!
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Thank you for your order. We&lsquo;ve received your catering request
          and will be in touch shortly.
        </p>
      </div>

      <Card>
        <CardHeader className="p-3 sm:p-4">
          <CardTitle className="text-base sm:text-lg">
            Order #{orderNumber}
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Placed on {new Date().toLocaleDateString()} at{" "}
            {new Date().toLocaleTimeString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
          <div className="space-y-1 sm:space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">
              Order Details
            </h3>
            <div className="text-xs sm:text-sm space-y-0.5 sm:space-y-1">
              <p>
                <span className="font-medium">Event Date:</span>{" "}
                {formData.eventDate}
              </p>
              <p>
                <span className="font-medium">Event Time:</span>{" "}
                {formData.eventTime}
              </p>
              <p>
                <span className="font-medium">Number of Guests:</span>{" "}
                {formData.numberOfPeople}
              </p>
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">
              Contact Information
            </h3>
            <div className="text-xs sm:text-sm space-y-0.5 sm:space-y-1">
              <p>
                {formData.contactInfo.firstName} {formData.contactInfo.lastName}
              </p>
              <p>{formData.contactInfo.email}</p>
              <p>{formData.contactInfo.phone}</p>
            </div>
          </div>

          <div className="space-y-1 sm:space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">
              Delivery Address
            </h3>
            <div className="text-xs sm:text-sm space-y-0.5 sm:space-y-1">
              <p>{formData.deliveryAddress.street}</p>
              <p>
                {formData.deliveryAddress.city},{" "}
                {formData.deliveryAddress.state}{" "}
                {formData.deliveryAddress.zipCode}
              </p>
            </div>
          </div>

          {formData.specialInstructions && (
            <div className="space-y-1 sm:space-y-2">
              <h3 className="font-semibold text-sm sm:text-base">
                Special Instructions
              </h3>
              <p className="text-xs sm:text-sm">
                {formData.specialInstructions}
              </p>
            </div>
          )}

          <div className="space-y-1 sm:space-y-2">
            <h3 className="font-semibold text-sm sm:text-base">
              Order Summary
            </h3>
            <div className="space-y-1.5 sm:space-y-2">
              {formData.selectedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-0.5 sm:py-1 text-xs sm:text-sm"
                >
                  <div>
                    <p>{item.name}</p>
                    <p className="text-gray-500 text-[10px] sm:text-xs">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              <div className="flex justify-between items-center py-0.5 sm:py-1 text-xs sm:text-sm">
                <p>Service Fee ({formData.numberOfPeople} people)</p>
                <p>${(formData.numberOfPeople * 5).toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center pt-1.5 sm:pt-2 font-bold text-sm sm:text-base">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
        <Button
          onClick={handlePrint}
          variant="outline"
          className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          <Download className="h-3 w-3 sm:h-4 sm:w-4" /> Print Receipt
        </Button>

        <Link href="/" passHref>
          <Button
            type="reset"
            className="bg-teal-600 hover:bg-teal-700 text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <Home className="h-3 w-3 sm:h-4 sm:w-4" /> Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default OrderSuccess;
