import { env } from "@/env";
import ApiError from "@/lib/api/handlers/api-error";
import ApiService from "@/lib/api/services";

const API_BASE_URL: string = env.VITE_BACKEND_API_BASE_URL;

/**
 * Base class for API controllers.
 *
 * - Provides a shared instance of `ApiService` for API interactions.
 * - Handles error logging for API errors.
 * - Ensures that class methods are correctly bound to `this` to avoid issues with method calls.
 */
export default class BaseController {
  /** An instance of `ApiService` for making API requests. */
  public readonly apiService: ApiService;

  /**
   * Initializes a new instance of `BaseController`.
   *
   * - Takes an optional token for authentication and a bypass flag to configure `ApiService`.
   * - Instantiates `ApiService` for API interactions.
   * - Automatically binds all methods of the class to ensure correct `this` context.
   *
   * @param {string | null} [token] - The authentication token, or null if not available.
   * @param {boolean} byPass - If true, bypasses authentication; if false, requires a token.
   */
  constructor(byPass: boolean, token: string | null = null) {
    const isTest =
      import.meta.env.MODE === "test" || process.env.NODE_ENV === "test";
    const baseUrl = isTest ? "" : API_BASE_URL;

    this.apiService = new ApiService(baseUrl, token, byPass);

    Object.getOwnPropertyNames(Object.getPrototypeOf(this))
      // @ts-expect-error HACK: this warning can be ignored
      .filter((methodName): methodName is keyof this => {
        return (
          methodName !== "constructor" &&
          typeof this[methodName as keyof this] === "function"
        );
      })
      .forEach((methodName) => {
        this[methodName as keyof this] =
          // @ts-expect-error HACK: this warning can be ignored
          this[methodName as keyof this].bind(this);
      });
  }

  /**
   * Handles errors thrown within API controllers.
   *
   * - If the error is an instance of `ApiError`, it logs the error message.
   * - The error is then re-thrown for further handling by the caller.
   *
   * @param {unknown} error - The error that occurred.
   * @throws The same error that was passed in.
   */
  protected handleError(error: unknown): never {
    if (error instanceof ApiError) {
      throw new Error(error.getErrorMessage());
    }

    throw error;
  }
}
