import { ROUTES } from "@/config/routes.config"
import { redirect } from "next/navigation"

export default function HomePage() {
  redirect(ROUTES.HOME_ROUTE)
}