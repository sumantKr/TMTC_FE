const authRoute = "user";

export const loginRoute = `${authRoute}/login`;
export const registerRoute = `${authRoute}/registration`;
export const logoutRoute = `${authRoute}/logout`;

export const itineraryRoute = "itinerary";
export const itineraryDetailRoute = `${itineraryRoute}/details`;
export const itineraryListRoute = `${itineraryRoute}/list`;
export const itineraryCalendarRoute = `${itineraryRoute}/calendar`;

export const itineraryStatsRoute = `${itineraryRoute}/stats`;

export const itineraryTotalCountRoute = `${itineraryStatsRoute}/count/total`;
export const itineraryUpcomingTripsRoute = `${itineraryStatsRoute}/trips/upcoming`;
export const itineraryMonthlyBudgetRoute = `${itineraryStatsRoute}/month/budget`;
export const itineraryMonthlyTripsRoute = `${itineraryStatsRoute}/trips/month`;
