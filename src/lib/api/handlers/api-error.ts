export default class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public body: Record<string, unknown> | undefined,
    public response: Response,
  ) {
    super(message);
    this.name = "ApiError";
  }

  isUnAuthenticated() {
    return this.statusCode === 401;
  }

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
