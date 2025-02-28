import BaseController from "@/lib/api/controllers/main/base-controller";
import { getAuthToken } from "@/lib/utils"; // Assuming this is where getAuthToken is defined

/**
 * A controller for authenticated API requests.
 *
 * - Extends `BaseController` with `byPass` set to `false`, requiring a token for all requests.
 * - Fetches the token automatically using `getAuthToken`.
 */
export default class ControllerWithAuth extends BaseController {
  /**
   * Initializes a new instance of `ControllerWithAuth`.
   *
   * - Automatically retrieves the authentication token using `getAuthToken`.
   * - Configures the controller for authenticated requests (bypass is disabled).
   */
  constructor() {
    const token = getAuthToken(); // Fetch token directly
    super(false, token); // byPass is false, requiring a token
  }
}
