import { CreateItinerarySchema } from "@/components/add-itinerary/add-itinerary.config";
import { POST } from "./api-client";
import { itineraryRoute } from "./api-routes";

export async function addItinerary(itineraryDetails: CreateItinerarySchema) {
  return await POST(itineraryRoute, itineraryDetails);
}
