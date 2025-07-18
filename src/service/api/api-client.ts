"use server";
import { API_URL } from "@/config/constants";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { IApiResponse } from "./api-client.type";
import { cookies } from "next/headers";

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Attach JWT from cookies (on server)
apiClient.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("_ac_jwt")?.value;

  if (jwt) {
    config.headers?.set?.("Cookie", `_ac_jwt=${jwt}`);
  }

  return config;
});

function errorResponse(error: any): IApiResponse {
  return { ...error, error: true };
}

export async function GET(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<IApiResponse> {
  try {
    const response = await apiClient.get<IApiResponse>(url, {
      ...config,
      params,
    });
    return response.data;
  } catch (error: any) {
    const e = (error as AxiosError).response;
    return errorResponse(e);
  }
}
export async function POST(
  url: string,
  body?: Record<string, any> | FormData,
  config?: AxiosRequestConfig
): Promise<IApiResponse> {
  try {
    const response = await apiClient.post<IApiResponse>(url, body, config);
    return response.data;
  } catch (error: any) {
    const e = (error as AxiosError).response?.data;
    return errorResponse(e);
  }
}
export async function PUT(
  url: string,
  body?: Record<string, any> | FormData,
  config?: AxiosRequestConfig
): Promise<IApiResponse> {
  try {
    const response = await apiClient.put<IApiResponse>(url, body, config);
    return response.data;
  } catch (error: any) {
    const e = (error as AxiosError).response?.data;
    return errorResponse(e);
  }
}
export async function DELETE(
  url: string,
  params?: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<IApiResponse> {
  try {
    const response = await apiClient.delete<IApiResponse>(url, {
      ...config,
      params,
    });
    return response.data;
  } catch (error: any) {
    const e = (error as AxiosError).response?.data;
    return errorResponse(e);
  }
}
