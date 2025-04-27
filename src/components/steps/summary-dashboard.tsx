import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Utensils, Users, Calendar, Clock, ChefHat } from "lucide-react";

const SummaryDashboard = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl sm:text-2xl font-bold text-teal-800">
          Welcome to Our Catering Service
        </h2>
        <p className="text-gray-600 text-sm sm:text-base">
          Follow these simple steps to place your catering order
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Card>
          <CardHeader className="pb-2 p-3 sm:p-4">
            <CardTitle className="flex items-center gap-2 text-teal-700 text-base sm:text-lg">
              <Utensils className="h-4 w-4 sm:h-5 sm:w-5" /> Menu Selection
            </CardTitle>
            <CardDescription>Step 1</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <p className="text-xs sm:text-sm text-gray-600">
              Browse our menu and select the items you'd like to order for your
              event.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 p-3 sm:p-4">
            <CardTitle className="flex items-center gap-2 text-teal-700 text-base sm:text-lg">
              <Users className="h-4 w-4 sm:h-5 sm:w-5" /> Guest Count
            </CardTitle>
            <CardDescription>Step 1</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <p className="text-xs sm:text-sm text-gray-600">
              Let us know how many people you're expecting at your event.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 p-3 sm:p-4">
            <CardTitle className="flex items-center gap-2 text-teal-700 text-base sm:text-lg">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" /> Event Details
            </CardTitle>
            <CardDescription>Step 2</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <p className="text-xs sm:text-sm text-gray-600">
              Provide your contact information and delivery address.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 p-3 sm:p-4">
            <CardTitle className="flex items-center gap-2 text-teal-700 text-base sm:text-lg">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" /> Scheduling
            </CardTitle>
            <CardDescription>Step 2</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 pt-0">
            <p className="text-xs sm:text-sm text-gray-600">
              Choose the date and time for your catering delivery.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-teal-50 p-3 sm:p-4 rounded-lg border border-teal-100">
        <div className="flex items-start gap-2 sm:gap-3">
          <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 text-teal-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-teal-800 text-sm sm:text-base">
              Our Promise
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              We use only the freshest ingredients and prepare everything on the
              day of your event. Our team will ensure your catering experience
              is seamless and delicious.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SummaryDashboard;
