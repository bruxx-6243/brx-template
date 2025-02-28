import BaseController from "@/lib/api/controllers/main/base-controller";

/**
 * A controller for authenticated API requests.
 *
 * - Extends `BaseController` with `byPass` set to `false`, requiring a token for all requests.
 */
export default class ControllerWithAuth extends BaseController {
  /**
   * Initializes a new instance of `ControllerWithAuth`.
   *
   * - Requires a token for authentication (bypass is disabled).
   *
   * @param {string | null} token - The authentication token, or null if not available (will cause requests to fail).
   */
  constructor(token: string | null) {
    super(false, token); // byPass is false, requiring a token
  }
}
