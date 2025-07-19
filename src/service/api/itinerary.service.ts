import { CreateItinerarySchema } from "@/components/itinerary/add-itinerary/add-itinerary.config";
import { DELETE, GET, POST, PUT } from "./api-client";
import {
  itineraryDetailRoute,
  itineraryListRoute,
  itineraryMonthlyBudgetRoute,
  itineraryMonthlyTripsRoute,
  itineraryRoute,
  itineraryTotalCountRoute,
  itineraryUpcomingTripsRoute,
} from "./api-routes";
import { addDays } from "date-fns";

export async function addItinerary(itineraryDetails: CreateItinerarySchema) {
  return await POST(itineraryRoute, itineraryDetails);
}
export async function updateItinerary({
  id,
  itineraryDetails,
}: {
  itineraryDetails: CreateItinerarySchema;
  id: string;
}) {
  return await PUT(`${itineraryRoute}/${id}`, itineraryDetails);
}
export async function getItineraryById(itineraryId: string) {
  return await GET(`${itineraryDetailRoute}/${itineraryId}`);
}
export async function deleteItinerary(itineraryId: string) {
  return await DELETE(`${itineraryRoute}/${itineraryId}`);
}
export async function getItineraries(page: number, title?: string) {
  const res = await GET(itineraryListRoute, { page, limit: 10, title });
  return res;
}
export async function getItinerariesCalendarView(startDate: Date) {
  return await GET(itineraryListRoute, {
    startDate,
    endDate: addDays(startDate, 2),
  });
}

export async function getTotalItineraries() {
  return await GET(itineraryTotalCountRoute);
}

export async function getUpcomingTrips() {
  return await GET(itineraryUpcomingTripsRoute);
}

export async function getMonthlyBudget() {
  return await GET(itineraryMonthlyBudgetRoute);
}

export async function getMonthlyTrips() {
  return await GET(itineraryMonthlyTripsRoute);
}
