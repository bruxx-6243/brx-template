import BaseController from "@/lib/api/controllers/main/base-controller";

/**
 * A controller for unauthenticated API requests.
 *
 * - Extends `BaseController` with `byPass` set to `true`, allowing requests without a token.
 */
export default class ControllerWithoutAuth extends BaseController {
  constructor() {
    super(true, null); // Pass baseUrl to BaseController
  }

  public async get<T>(url: string, customErrorMessage?: string): Promise<T> {
    return this.apiService.get(url, {}, customErrorMessage);
  }
}
