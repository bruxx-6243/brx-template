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
}
