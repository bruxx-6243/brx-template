import { env } from "@/env";
import { getAuthToken } from "@/lib/utils";
import ApiError from "@/lib/api/handlers/api-error";

type HeadersInit = Record<string, string> | [string, string][] | Headers;
const API_BASE_URL: string = env.VITE_BACKEND_API_BASE_URL;

/**
 * A service for handling API requests.
 *
 * - Automatically includes authentication headers.
 * - Provides methods for common HTTP operations (GET, POST, PUT, PATCH, DELETE).
 * - Handles errors and throws `ApiError` when requests fail.
 */
export default class ApiService {
  /**
   * Creates HTTP headers, including the Authorization token if required.
   *
   * @param {HeadersInit} [customHeaders={}] - Additional custom headers.
   * @param {boolean} [byPass=false] - If true, bypasses authentication headers.
   * @returns {HeadersInit} The constructed headers.
   */
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

  /**
   * Makes an HTTP request and handles responses.
   *
   * @template T - The expected response type.
   * @param {"GET" | "POST" | "PUT" | "PATCH" | "DELETE"} method - HTTP method.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {Record<string, unknown> | FormData} [body] - Request body (optional).
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @param {boolean} [byPass=false] - If true, bypass authentication headers.
   * @returns {Promise<T>} The parsed JSON response.
   * @throws {ApiError} Throws an `ApiError` if the request fails.
   */
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

  /**
   * Sends a GET request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @param {boolean} [byPass=false] - If true, bypass authentication headers.
   * @returns {Promise<T>} The parsed JSON response.
   */
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

  /**
   * Sends a POST request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {Record<string, unknown> | FormData} [body] - Request body.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @param {boolean} [byPass=false] - If true, bypass authentication headers.
   * @returns {Promise<T>} The parsed JSON response.
   */
  post<T>(
    url: string,
    headers: HeadersInit = {},
    body?: Record<string, unknown> | FormData,
    customErrorMessage?: string,
    byPass = false,
  ): Promise<T> {
    return this.request("POST", url, headers, body, customErrorMessage, byPass);
  }

  /**
   * Sends a PUT request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {Record<string, unknown> | FormData} [body] - Request body.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @param {boolean} [byPass=false] - If true, bypass authentication headers.
   * @returns {Promise<T>} The parsed JSON response.
   */
  put<T>(
    url: string,
    headers: HeadersInit = {},
    body?: Record<string, unknown> | FormData,
    customErrorMessage?: string,
    byPass = false,
  ): Promise<T> {
    return this.request("PUT", url, headers, body, customErrorMessage, byPass);
  }

  /**
   * Sends a PATCH request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {Record<string, unknown> | FormData} [body] - Request body.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @param {boolean} [byPass=false] - If true, bypass authentication headers.
   * @returns {Promise<T>} The parsed JSON response.
   */
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

  /**
   * Sends a DELETE request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @param {boolean} [byPass=false] - If true, bypass authentication headers.
   * @returns {Promise<T>} The parsed JSON response.
   */
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
