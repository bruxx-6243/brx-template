import BaseController from "@/lib/api/controllers/main/base-controller";

/**
 * A controller for unauthenticated API requests.
 *
 * - Extends `BaseController` with `byPass` set to `true`, allowing requests without a token.
 */
export default class ControllerWithoutAuth extends BaseController {
  /**
   * Initializes a new instance of `ControllerWithoutAuth`.
   *
   * - Configures the controller for unauthenticated requests (bypass is enabled).
   */
  constructor() {
    super(true, null); // byPass is true, token is null (ignored)
  }
}
