import { routeTree } from "@/routeTree.gen";
import { createRouter } from "@tanstack/react-router";

/**
 * Initializes and exports the application's router.
 *
 * @constant {RouterInstance} router - The router instance created using TanStack Router.
 *
 * @property {Object} routeTree - The application's route tree, generated dynamically.
 * @property {Object} context - The global context for the router.
 * @property {string | null} context.token - The authentication token, initialized as `null`.
 */

const basepath = import.meta.env.PROD ? "/brx-template" : "/";

export const router = createRouter({
  routeTree,
  context: { token: null },
  basepath,
});
