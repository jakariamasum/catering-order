import type { Metadata } from "next";
import OrderWizard from "@/components/order-wizard";

export const metadata: Metadata = {
  title: "Order Catering | Gourmet Catering Service",
  description: "Place your catering order for your next event",
};

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-burgundy-50 to-white">
      <OrderWizard />
    </main>
  );
};
export default Home;
