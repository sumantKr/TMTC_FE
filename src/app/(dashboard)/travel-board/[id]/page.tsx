import ItineraryContainer from "@/components/itinerary/itinerary-card-container";
import { IApiResponse } from "@/service/api/api-client.type";
import { getItineraryById } from "@/service/api/itinerary.service";
import { IPageProps } from "@/types/page.types";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

interface IMetaDataId {
    id: string
}

type IGenerateMetaDataProps = IPageProps<any, IMetaDataId>



export async function generateMetadata({ params }: IGenerateMetaDataProps): Promise<Metadata> {
    const itParams = await params
    const itinerary = (await getItineraryById(itParams.id)).data;

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
    id: string

}
type IItineraryPageProps = IPageProps<any, IItineraryParams>
export default async function ItineraryPage({ params }: IItineraryPageProps) {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["itinerary", id],
        queryFn: () => getItineraryById(id),
    });


    const itinerary: IApiResponse = queryClient.getQueryData(["itinerary", id])!;


    // return <></>
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ItineraryContainer itinerary={itinerary.data} variant="page" />
        </HydrationBoundary>
    );
}
