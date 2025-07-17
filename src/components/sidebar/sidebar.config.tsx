import { ROUTES } from "@/config/routes.config";
import { Calendar, Home, Plane, Table } from "lucide-react"; // icons from lucide-react

export const SIDEBAR_CONFIG = [
    { icon: Home, label: "Home", href: ROUTES.HOME_ROUTE },
    { icon: Plane, label: "Add Plan", href: ROUTES.ADD_ITINERARY },
    { icon: Calendar, label: "Travel Calendar", href: ROUTES.TRAVEL_CALENDAR },
    { icon: Table, label: "Travel Board", href: ROUTES.TRAVEL_BOARD },
];