import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",

  client: {
    VITE_PORT: z.string().min(1),
    VITE_BACKEND_API_BASE_URL: z.string().min(1),
  },

  runtimeEnv: {
    VITE_PORT: import.meta.env.VITE_PORT,
    VITE_BACKEND_API_BASE_URL: import.meta.env.VITE_BACKEND_API_BASE_URL,
  },

  emptyStringAsUndefined: true,
});
