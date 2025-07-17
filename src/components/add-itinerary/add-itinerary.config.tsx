import * as z from "zod";

export const createItinerarySchema = z.object({
    title: z.string().min(1, "Title is required"),
    destination: z.string().min(1, "Destination is required"),
    budget: z.number().min(1, "Budget must be at least 1"),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Start date must be a valid date",
    }),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "End date must be a valid date",
    }),
});
export type CreateItinerarySchema = z.infer<typeof createItinerarySchema>;
