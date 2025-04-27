export type MenuCategory =
  | "appetizers"
  | "mains"
  | "sides"
  | "desserts"
  | "beverages";

export type MenuItemType = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  quantity: number;
};

export type OrderFormData = {
  selectedItems: MenuItemType[];
  numberOfPeople: number;
  contactInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  specialInstructions: string;
  eventDate: string;
  eventTime: string;
};

export interface IForm {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder: string;
}
