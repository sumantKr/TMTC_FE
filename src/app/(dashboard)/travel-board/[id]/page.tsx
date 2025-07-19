import ItineraryContainer from "@/components/itinerary/itinerary-card-container";
import { schemaCreator } from "@/lib/schema-creator";
import { IApiResponse } from "@/service/api/api-client.type";
import { getItineraryById } from "@/service/api/itinerary.service";
import { IPageProps } from "@/types/page.types";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import Script from "next/script";

interface IMetaDataId {
    id: string;
}

type IGenerateMetaDataProps = IPageProps<any, IMetaDataId>;

export async function generateMetadata({ params }: IGenerateMetaDataProps): Promise<Metadata> {
    const itParams = await params;
    const { data: itinerary, error } = await getItineraryById(itParams.id);

    if (error) {
        return {};
    }

    return {
        title: `${itinerary.title} | Travel Planner`,
        description: `Plan your trip to ${itinerary.destination} with a budget of ₹${itinerary.budget}`,
        openGraph: {
            title: itinerary.title,
            description: `Trip to ${itinerary.destination} from ${itinerary.startDate} to ${itinerary.endDate}`,
        },
    };
}

interface IItineraryParams {
    id: string;
}

type IItineraryPageProps = IPageProps<any, IItineraryParams>;

export default async function ItineraryPage({ params }: IItineraryPageProps) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["itinerary", id],
        queryFn: () => getItineraryById(id),
    });

    const itinerary: IApiResponse = queryClient.getQueryData(["itinerary", id])!;

    if (itinerary.error) {
        return <div className="font-semibold text-2xl">No Listing Found</div>;
    }

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Script
                id="itinerary-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: schemaCreator(itinerary.data) }}
            />
            <ItineraryContainer itinerary={itinerary.data} variant="page" />
        </HydrationBoundary>
    );
}
