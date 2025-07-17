import { LoginSchema } from "@/components/login-form/login-form.config";
import { POST } from "./api-client";
import { loginRoute, logoutRoute, registerRoute } from "./api-routes";
import { RegisterSchema } from "@/components/register-form/register-form.config";

export async function loginUser(loginDetails: LoginSchema) {
  return await POST(loginRoute, loginDetails);
}
export async function registerUser(registerDetails: RegisterSchema) {
  return await POST(registerRoute, registerDetails);
}
export async function logoutUser() {
  return await POST(logoutRoute);
}
