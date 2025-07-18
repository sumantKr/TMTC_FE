import Link from "next/link";
import ItineraryContainer from "./itinerary-card-container";
import { getItineraries } from "@/service/api/itinerary.service";

export default async function ItineraryListPage(searchParams: any) {
  console.debug('🚀 ~ ItineraryListPage ~ searchParams:', searchParams)
  const page = parseInt(searchParams.page || "1", 10);
  const response = await getItineraries(page);
  const { data: itineraries, totalPages } = response;

  return (
    <div className="p-6 space-y-6">
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {itineraries.map((itinerary: any) => (
          <ItineraryContainer key={itinerary.id} itinerary={itinerary} variant="card" />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          const isActive = page === pageNum;
          return (
            <Link
              key={pageNum}
              href={`/itinerary?page=${pageNum}`}
              className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${isActive
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
