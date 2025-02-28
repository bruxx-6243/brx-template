import ApiError from "@/lib/api/handlers/api-error";

type HeadersInit = Record<string, string> | [string, string][] | Headers;
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type RequestBody = Record<string, unknown> | FormData;

/**
 * A service for handling API requests.
 *
 * - Automatically includes authentication headers if a token is provided and bypass is false.
 * - Provides methods for common HTTP operations (GET, POST, PUT, PATCH, DELETE).
 * - Handles errors and throws `ApiError` when requests fail.
 */
export default class ApiService {
  private readonly baseUrl: string;
  private readonly token: string | null;
  private readonly byPass: boolean;

  /**
   * Creates an instance of ApiService.
   *
   * @param {string} baseUrl - The base URL for API requests.
   * @param {string | null} token - The authentication token, or null if not available.
   * @param {boolean} byPass - If true, bypasses authentication; if false, requires a token.
   */
  constructor(baseUrl: string, token: string | null, byPass: boolean) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.byPass = byPass;
  }

  /**
   * Creates HTTP headers, including the Authorization token if provided and not bypassed.
   *
   * @param {HeadersInit} [customHeaders={}] - Additional custom headers.
   * @returns {Headers} The constructed headers.
   * @throws {ApiError} If token is null and bypass is false (protected route).
   */
  private createHeaders(customHeaders: HeadersInit = {}): Headers {
    const headers = new Headers(customHeaders);

    if (!this.byPass) {
      if (!this.token) {
        throw new ApiError(
          "Authentication token is required for this request",
          401,
          undefined,
          null,
        );
      }
      headers.set("Authorization", `Bearer ${this.token}`);
    }

    return headers;
  }

  /**
   * Makes an HTTP request and handles responses.
   *
   * @template T - The expected response type.
   * @param {HttpMethod} method - HTTP method.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {RequestBody} [body] - Request body (optional).
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @returns {Promise<T>} The parsed JSON response.
   * @throws {ApiError} Throws an `ApiError` if the request fails or token is missing for protected routes.
   */
  private async request<T>(
    method: HttpMethod,
    url: string,
    headers: HeadersInit = {},
    body?: RequestBody,
    customErrorMessage?: string,
  ): Promise<T> {
    const requestHeaders = this.createHeaders(headers);
    const isJsonBody = body && !(body instanceof FormData);

    if (isJsonBody) {
      requestHeaders.set("Content-Type", "application/json");
    }

    const options: RequestInit = {
      method,
      headers: requestHeaders,
      ...(body && {
        body: isJsonBody ? JSON.stringify(body) : body,
      }),
    };

    try {
      const response = await fetch(`${this.baseUrl}${url}`, options);

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
    } catch (error) {
      if (error instanceof ApiError) throw error;

      throw new ApiError(
        customErrorMessage ?? "Network error occurred",
        0,
        undefined,
        null,
      );
    }
  }

  /**
   * Sends a GET request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @returns {Promise<T>} The parsed JSON response.
   */
  public get<T>(
    url: string,
    headers: HeadersInit = {},
    customErrorMessage?: string,
  ): Promise<T> {
    return this.request("GET", url, headers, undefined, customErrorMessage);
  }

  /**
   * Sends a POST request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {RequestBody} [body] - Request body.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @returns {Promise<T>} The parsed JSON response.
   */
  public post<T>(
    url: string,
    headers: HeadersInit = {},
    body?: RequestBody,
    customErrorMessage?: string,
  ): Promise<T> {
    return this.request("POST", url, headers, body, customErrorMessage);
  }

  /**
   * Sends a PUT request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {RequestBody} [body] - Request body.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @returns {Promise<T>} The parsed JSON response.
   */
  public put<T>(
    url: string,
    headers: HeadersInit = {},
    body?: RequestBody,
    customErrorMessage?: string,
  ): Promise<T> {
    return this.request("PUT", url, headers, body, customErrorMessage);
  }

  /**
   * Sends a PATCH request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {RequestBody} [body] - Request body.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @returns {Promise<T>} The parsed JSON response.
   */
  public patch<T>(
    url: string,
    headers: HeadersInit = {},
    body?: RequestBody,
    customErrorMessage?: string,
  ): Promise<T> {
    return this.request("PATCH", url, headers, body, customErrorMessage);
  }

  /**
   * Sends a DELETE request.
   *
   * @template T - The expected response type.
   * @param {string} url - The endpoint URL.
   * @param {HeadersInit} [headers={}] - Custom headers.
   * @param {string} [customErrorMessage] - Custom error message if request fails.
   * @returns {Promise<T>} The parsed JSON response.
   */
  public delete<T>(
    url: string,
    headers: HeadersInit = {},
    customErrorMessage?: string,
  ): Promise<T> {
    return this.request("DELETE", url, headers, undefined, customErrorMessage);
  }
}
