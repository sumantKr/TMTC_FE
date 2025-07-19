import { IItinerary } from "@/types/itinerary";
import EditItineraryModal from "./edit-itinerary-modal/edit-itinerary-modal";
import { View } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config/routes.config";
import { Button } from "../ui/button";
import DeleteItineraryModal from "./delete-itinerary-modal/delete-itinerary-modal";

interface IItineraryContainerProps {
  itinerary: IItinerary;
  variant?: "card" | "page"; // optional, defaults to 'card'
}

export default function ItineraryContainer({
  itinerary,
  variant = "card",
}: IItineraryContainerProps) {
  const { title, destination, budget, startDate, endDate, _id } = itinerary;

  const content = (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p><strong>Destination:</strong> {destination}</p>
      <p><strong>Budget:</strong> ${budget.toLocaleString()}</p>
      <p><strong>Start:</strong> {new Date(startDate).toLocaleDateString()}</p>
      <p><strong>End:</strong> {new Date(endDate).toLocaleDateString()}</p>
    </div>
  );

  if (variant === "card") {
    return (
      <div className="flex justify-between items-start relative border p-4 rounded-xl shadow-sm bg-white min-w-md w-md hover:shadow-2xl  border-transparent hover:border-black ">
        {content}
        <div className=" flex gap-x-2 items-center">
          <Link className=" cursor-pointer bg-blue-200 text-blue-900 rounded-md border border-blue-400" href={`${ROUTES.TRAVEL_BOARD}/${itinerary._id}`} key={itinerary._id}>
            <Button variant={'ghost'}>
              <View />
            </Button>
          </Link>
          <EditItineraryModal defaultValues={itinerary} />
          <DeleteItineraryModal itineraryId={_id} />
        </div>
      </div>
    );
  }

  // Full-page layout
  return (
    <div className="p-8 flex justify-between items-start relative  max-w-2xl mx-auto bg-gray-50 rounded-xl shadow-lg">
      {content}
      <div className="space-x-2">
        <EditItineraryModal defaultValues={itinerary} />
        <DeleteItineraryModal itineraryId={_id} />
      </div>
    </div>
  );
}
