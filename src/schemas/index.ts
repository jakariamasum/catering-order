import z from "zod";
export const menuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.enum(["appetizers", "mains", "sides", "desserts", "beverages"]),
  image: z.string(),
  quantity: z.number().int().min(0),
});

export const numberOfPeopleSchema = z.object({
  numberOfPeople: z
    .number()
    .int()
    .min(1, "At least 1 person is required")
    .max(500, "Maximum 500 people allowed"),
});

export const contactInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const deliveryAddressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
});

export const eventDetailsSchema = z.object({
  eventDate: z.string().min(1, "Event date is required"),
  eventTime: z.string().min(1, "Event time is required"),
  specialInstructions: z.string().optional(),
});

export const orderFormSchema = z.object({
  selectedItems: z
    .array(menuItemSchema)
    .min(1, "Please select at least one menu item"),
  numberOfPeople: numberOfPeopleSchema.shape.numberOfPeople,
  contactInfo: contactInfoSchema,
  deliveryAddress: deliveryAddressSchema,
  specialInstructions: z.string().optional(),
  eventDate: eventDetailsSchema.shape.eventDate,
  eventTime: eventDetailsSchema.shape.eventTime,
});
