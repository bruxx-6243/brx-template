import BaseController from "@/lib/api/controllers/main/base-controller";
import { getAuthToken } from "@/lib/utils";

/**
 * A controller for authenticated API requests.
 *
 * - Extends `BaseController` with `byPass` set to `false`, requiring a token for all requests.
 * - Fetches the token automatically using `getAuthToken`.
 */
export default class ControllerWithAuth extends BaseController {
  constructor() {
    const token = getAuthToken();
    super(false, token); // Pass baseUrl to BaseController
  }

  public async get<T>(url: string, customErrorMessage?: string): Promise<T> {
    return this.apiService.get(url, {}, customErrorMessage);
  }
}
