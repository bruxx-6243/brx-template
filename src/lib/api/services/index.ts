import { env } from "@/env";
import ApiError from "@/lib/api/handlers/api-error";
import { getAuthToken } from "@/lib/utils";

type HeadersInit = Record<string, string> | [string, string][] | Headers;
const API_BASE_URL: string = env.VITE_BACKEND_API_BASE_URL;

export default class ApiService {
  private createHeaders(
    customHeaders: HeadersInit = {},
    byPass = false,
  ): HeadersInit {
    const headers: HeadersInit = { ...customHeaders };

    if (!byPass) {
      const token = getAuthToken();

      if (token) {
        (headers as Record<string, string>)["Authorization"] =
          `Bearer ${token}`;
      }
    }

    return headers;
  }

  private async request<T>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    headers: HeadersInit = {},
    body?: Record<string, unknown> | FormData,
    customErrorMessage?: string,
    byPass = false,
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: this.createHeaders(headers, byPass),
    };

    if (["POST", "PUT", "PATCH"].includes(method) && body) {
      if (body instanceof FormData) {
        options.body = body;
      } else {
        options.body = JSON.stringify(body);
        (options.headers as Record<string, string>)["Content-Type"] =
          "application/json";
      }
    }

    const response = await fetch(`${API_BASE_URL}${url}`, options);

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      const backendErrorMessage =
        errorBody.message ||
        errorBody.error ||
        errorBody.detail ||
        "Unknown error";

      const errorMessage = customErrorMessage ?? backendErrorMessage;

      throw new ApiError(errorMessage, response.status, errorBody, response);
    }

    return response.json() as Promise<T>;
  }

  get<T>(
    url: string,
    headers: HeadersInit = {},
    customErrorMessage?: string,
    byPass = false,
  ): Promise<T> {
    return this.request(
      "GET",
      url,
      headers,
      undefined,
      customErrorMessage,
      byPass,
    );
  }

  post<T>(
    url: string,
    headers: HeadersInit = {},
    body?: Record<string, unknown> | FormData,
    customErrorMessage?: string,
    byPass = false,
  ): Promise<T> {
    return this.request("POST", url, headers, body, customErrorMessage, byPass);
  }

  put<T>(
    url: string,
    headers: HeadersInit = {},
    body?: Record<string, unknown> | FormData,
    customErrorMessage?: string,
    byPass = false,
  ): Promise<T> {
    return this.request("PUT", url, headers, body, customErrorMessage, byPass);
  }

  patch<T>(
    url: string,
    headers: HeadersInit = {},
    body?: Record<string, unknown> | FormData,
    customErrorMessage?: string,
    byPass = false,
  ): Promise<T> {
    return this.request(
      "PATCH",
      url,
      headers,
      body,
      customErrorMessage,
      byPass,
    );
  }

  delete<T>(
    url: string,
    headers: HeadersInit = {},
    customErrorMessage?: string,
    byPass = false,
  ): Promise<T> {
    return this.request(
      "DELETE",
      url,
      headers,
      undefined,
      customErrorMessage,
      byPass,
    );
  }
}
