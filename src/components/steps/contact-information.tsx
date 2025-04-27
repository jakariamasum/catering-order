"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  contactInfoSchema,
  deliveryAddressSchema,
  eventDetailsSchema,
} from "@/schemas";
import { useOrder } from "@/context/order-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CalendarIcon, MapPin, User } from "lucide-react";
import { Label } from "../ui/label";

import GCForm from "../form/GCForm";
import GCInput from "../form/GCInput";
import GCDatePick from "../form/GCDatePick";
import GCTimeSelect from "../form/GCTimeSelect";
import GCTextArea from "../form/GCTextArea";

const formSchema = z.object({
  contactInfo: contactInfoSchema,
  deliveryAddress: deliveryAddressSchema,
  eventDate: eventDetailsSchema.shape.eventDate,
  eventTime: eventDetailsSchema.shape.eventTime,
  specialInstructions: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ContactInformation = () => {
  const { formData, updateFormData, totalPrice } = useOrder();
  console.log("formdata: ", formData);

  useEffect(() => {
    if (formData) {
      localStorage.setItem("cateringOrderData", JSON.stringify(formData));
    }
  }, [formData]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    updateFormData({
      contactInfo: data.contactInfo,
      deliveryAddress: data.deliveryAddress,
      eventDate: data.eventDate,
      eventTime: data.eventTime,
      specialInstructions: data.specialInstructions,
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-1 sm:space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-teal-800">
          Contact & Delivery Information
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm">
          Please provide your contact details and delivery information
        </p>
      </div>

      <GCForm onSubmit={onSubmit} resolver={zodResolver(formSchema)}>
        <Card>
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <User className="h-4 w-4 sm:h-5 sm:w-5" /> Contact Information
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              How can we reach you regarding your order?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <GCInput
                name="firstName"
                label="First Name"
                type="text"
                placeholder="john doe"
              />

              <GCInput
                name="lastName"
                label="Last Name"
                type="text"
                placeholder="doe"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <GCInput
                name="email"
                label="Email"
                type="email"
                placeholder="john@doe.com"
              />

              <GCInput
                name="phone"
                label="Phone Number"
                type="number"
                placeholder="xxxxxxxxxxxx"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5" /> Delivery Address
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Where should we deliver your catering order?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
            <GCInput
              name="streetAddress"
              label="Street Address"
              type="text"
              placeholder="12/A Alfa road"
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <GCInput
                name="city"
                label="City"
                type="text"
                placeholder="dhaka"
              />

              <div className="space-y-1 sm:space-y-2">
                <GCInput
                  name="state"
                  label="state"
                  type="text"
                  placeholder="dhaka"
                />
              </div>

              <GCInput
                name="zipCode"
                label="Zip Code"
                type="number"
                placeholder="5000"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" /> Event Details
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              When is your event taking place?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0 space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="eventDate" className="text-xs sm:text-sm">
                  Event Date
                </Label>

                <GCDatePick name="eventDate" label="Event Date" />
              </div>

              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="eventTime" className="text-xs sm:text-sm">
                  Event Time
                </Label>
                <GCTimeSelect name="eventTime" label="Event Time" />
              </div>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <GCTextArea
                name="specialInstructions"
                label="Special Instruction (Optional)"
                placeholder="comments here"
                type=""
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="text-base sm:text-lg">
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <div className="space-y-2">
              <div className="flex justify-between items-center py-1.5 sm:py-2 border-b text-xs sm:text-sm">
                <p>Items Subtotal</p>
                <p>
                  $
                  {formData.selectedItems
                    .reduce((sum, item) => sum + item.price * item.quantity, 0)
                    .toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between items-center py-1.5 sm:py-2 border-b text-xs sm:text-sm">
                <p>Service Fee ({formData.numberOfPeople} people)</p>
                <p>${(formData.numberOfPeople * 5).toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center pt-1.5 sm:pt-2 font-bold text-sm sm:text-base">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </GCForm>
    </div>
  );
};

export default ContactInformation;
