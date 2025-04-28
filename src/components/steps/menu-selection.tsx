"use client";

import { useState, useEffect } from "react";
import { FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrder } from "@/context/order-context";
import { MenuItemType } from "@/types";
import { numberOfPeopleSchema } from "@/schemas";
import { getMenuItemsByCategory, menuItems } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MinusCircle, PlusCircle, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Button from "../ui/button";
import GCInput from "../form/GCInput";
import GCForm from "../form/GCForm";

const MenuSelection = () => {
  const { formData, updateFormData } = useOrder();
  const [selectedItems, setSelectedItems] = useState<MenuItemType[]>([]);
  const [activeTab, setActiveTab] = useState<string>("appetizers");

  useEffect(() => {
    if (formData.selectedItems && formData.selectedItems.length > 0) {
      setSelectedItems(formData.selectedItems);
    }
  }, [formData.selectedItems]);

  useEffect(() => {
    updateFormData({ selectedItems });
  }, [selectedItems]);

  const handleQuantityChange = (itemId: string, change: number) => {
    setSelectedItems((prev) => {
      const existingItemIndex = prev.findIndex((item) => item.id === itemId);
      const menuItem = menuItems.find((item) => item.id === itemId);

      if (!menuItem) return prev;

      const updatedItems = [...prev];

      if (existingItemIndex >= 0) {
        const newQuantity = updatedItems[existingItemIndex].quantity + change;

        if (newQuantity <= 0) {
          return updatedItems.filter((item) => item.id !== itemId);
        } else {
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: newQuantity,
          };
        }
      } else if (change > 0) {
        updatedItems.push({
          ...menuItem,
          quantity: change,
        });
      }

      return updatedItems;
    });
  };

  const getItemQuantity = (itemId: string): number => {
    const item = selectedItems.find((item) => item.id === itemId);
    return item ? item.quantity : 0;
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data, Number(data.numberOfPeople));
    updateFormData({ numberOfPeople: Number(data.numberOfPeople) });
  };

  const categories = [
    { id: "appetizers", label: "Appetizers" },
    { id: "mains", label: "Main Courses" },
    { id: "sides", label: "Side Dishes" },
    { id: "desserts", label: "Desserts" },
    { id: "beverages", label: "Beverages" },
  ];

  return (
    <GCForm onSubmit={onSubmit} resolver={zodResolver(numberOfPeopleSchema)}>
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-1 sm:space-y-2">
          <h2 className="text-xl sm:text-2xl font-bold text-teal-800">
            Menu Selection
          </h2>
          <p className="text-gray-600 text-sm">
            Choose items for your event and specify the number of guests
          </p>
        </div>

        <Card>
          <CardHeader className="p-3 sm:p-4">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" /> Number of Guests
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              How many people will be attending your event?
            </CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <GCInput
              type="number"
              name="numberOfPeople"
              placeholder="1"
              label="Number of People"
            />
          </CardContent>
        </Card>

        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-teal-800">
            Select Menu Items
          </h3>

          <Tabs
            defaultValue="appetizers"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 mb-3 sm:mb-4 w-full h-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="text-xs sm:text-sm py-1.5 sm:py-2"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent
                key={category.id}
                value={category.id}
                className="space-y-3 sm:space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {getMenuItemsByCategory(category.id).map((item) => (
                    <Card key={item.id}>
                      <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                        <CardTitle className="text-base sm:text-lg">
                          {item.name}
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-3 sm:p-4 py-1 sm:py-2">
                        <p className="font-semibold text-teal-700 text-sm sm:text-base">
                          ${item.price.toFixed(2)}
                        </p>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center p-3 sm:p-4 pt-1 sm:pt-2">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={getItemQuantity(item.id) === 0}
                          >
                            <MinusCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="sr-only">Decrease</span>
                          </Button>

                          <span className="w-5 sm:w-6 text-center text-sm sm:text-base">
                            {getItemQuantity(item.id)}
                          </span>

                          <Button
                            variant="secondary"
                            size="icon"
                            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <PlusCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="sr-only">Increase</span>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {selectedItems.length > 0 && (
          <Card>
            <CardHeader className="p-3 sm:p-4">
              <CardTitle className="text-base sm:text-lg">
                Selected Items
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 pt-0">
              <div className="space-y-2">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-1.5 sm:py-2 border-b text-sm sm:text-base"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between items-center pt-2 font-bold text-sm sm:text-base">
                  <p>Subtotal</p>
                  <p>
                    $
                    {selectedItems
                      .reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <button type="submit">ssssssssssss</button>
    </GCForm>
  );
};
export default MenuSelection;
