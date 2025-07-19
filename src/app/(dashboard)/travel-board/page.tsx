import ItineraryContainer from "@/components/itinerary/itinerary-card-container";
import TravelBoardHeader from "@/components/itinerary/travel-board-header";
import { ROUTES } from "@/config/routes.config";
import { IApiResponse } from "@/service/api/api-client.type";
import { getItineraries } from "@/service/api/itinerary.service";
import { IItinerary } from "@/types/itinerary";
import { IPageProps } from "@/types/page.types";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import Link from "next/link";

interface IItinerarySearchParam {
    page: string
    title?: string
}

type ItineraryListPageProps = IPageProps<IItinerarySearchParam>
export default async function ItineraryListPage({ searchParams }: ItineraryListPageProps) {
    const itinerarySearchParams = await searchParams
    const pageNumber = parseInt(itinerarySearchParams.page || "1", 10);
    const title = itinerarySearchParams.title;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["itineraries", pageNumber, title],
        queryFn: () => getItineraries(pageNumber, title),
    });

    const data: IApiResponse = await queryClient.getQueryData(["itineraries", pageNumber, title])!;

    const { data: itineraries, meta } = data;
    const { totalPages } = meta!

    if (itineraries.length === 0) {
        return <div className="p-32">
            <Link href={ROUTES.ADD_ITINERARY} className="font-semibold text-blue-500">Click here</Link>  to add travel plans!
        </div>
    }
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>


            <TravelBoardHeader defaultFilter={title} />
            <div className="p-6 space-y-6">
                {/* Grid of Cards */}
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-6">
                    {itineraries.map((itinerary: IItinerary) => (
                        <div className="col-span-2 xl:col-span-1" key={itinerary._id} >

                            <ItineraryContainer itinerary={itinerary} variant="card" />
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, i) => {
                        const pageNum = i + 1;
                        const isActive = pageNumber === pageNum;

                        return (
                            <Link
                                key={pageNum}
                                href={`${ROUTES.TRAVEL_BOARD}?page=${pageNum}`}
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
        </HydrationBoundary>
    );
}
