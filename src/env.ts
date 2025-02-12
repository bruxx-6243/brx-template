import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

/**
 * Environment configuration using `@t3-oss/env-core` and `zod` for validation.
 *
 * - Ensures required environment variables are present and valid.
 * - Uses `VITE_` prefix for client-side environment variables.
 * - Validates that `VITE_PORT` and `VITE_BACKEND_API_BASE_URL` are non-empty strings.
 * - Replaces empty strings with `undefined` for better handling.
 */
export const env = createEnv({
  clientPrefix: "VITE_", // Ensures all client-side env variables start with "VITE_"

  client: {
    /** The port on which the client application runs. */
    VITE_PORT: z.string().min(1),

    /** The base URL for backend API requests. */
    VITE_BACKEND_API_BASE_URL: z.optional(z.string().min(1)),
    VITE_REPO_NAME: z.optional(z.string().min(1)),
  },

  runtimeEnv: {
    VITE_PORT: import.meta.env.VITE_PORT,
    VITE_REPO_NAME: import.meta.env.VITE_REPO_NAME,
    VITE_BACKEND_API_BASE_URL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  },

  emptyStringAsUndefined: true, // Converts empty strings to `undefined`
});
