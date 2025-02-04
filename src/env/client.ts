import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "PUBLIC_",
  client: {
    PUBLIC_PORT: z.string().optional(),
    PUBLIC_BACKEND_BASE_URL: z.string().optional(),
  },
  runtimeEnv: import.meta.env,
});
