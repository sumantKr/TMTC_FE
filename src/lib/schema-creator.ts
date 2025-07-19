import { IItinerary } from "@/types/itinerary";

export function schemaCreator(data: IItinerary) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: data.title,
    description: `Trip to ${data.destination}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: data.budget,
    },
    itinerary: [
      {
        "@type": "ItemList",
        itemListElement: [
          {
            "@type": "Place",
            name: data.destination,
          },
        ],
      },
    ],
    startDate: data.startDate,
    endDate: data.endDate,
  });
}
