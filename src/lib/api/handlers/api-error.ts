/**
 * Custom error class for API-related errors.
 * Extends the built-in `Error` class to include HTTP status codes and response details.
 */
export default class ApiError extends Error {
  /**
   * Creates an instance of `ApiError`.
   *
   * @param {string} message - A human-readable error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   * @param {Record<string, unknown> | undefined} body - The optional response body containing additional error details.
   * @param {Response} response - The original `Response` object from the fetch request.
   */
  constructor(
    public message: string,
    public statusCode: number,
    public body: Record<string, unknown> | undefined,
    public response: Response,
  ) {
    super(message);
    this.name = "ApiError";
  }

  /**
   * Checks if the error represents an unauthenticated (401) response.
   *
   * @returns {boolean} `true` if the status code is 401 (Unauthorized), otherwise `false`.
   */
  isUnAuthenticated(): boolean {
    return this.statusCode === 401;
  }

  /**
   * Returns a user-friendly error message based on the HTTP status code.
   *
   * @returns {string} A descriptive error message.
   */
  getErrorMessage(): string {
    switch (this.statusCode) {
      case 400:
        return `Bad Request: ${this.message}`;
      case 401:
        return `Unauthorized: ${this.message}`;
      case 403:
        return `Forbidden: ${this.message}`;
      case 404:
        return `Not Found: ${this.message}`;
      case 500:
        return `Internal Server Error: ${this.message}`;
      case 503:
        return `Service Unavailable: ${this.message}`;
      default:
        return this.message || "An unexpected error occurred.";
    }
  }
}
