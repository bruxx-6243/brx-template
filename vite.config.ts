import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    preview: {
      port: Number.parseInt(env.VITE_PORT, 10),
      strictPort: true,
    },
    server: {
      port: Number.parseInt(env.VITE_PORT, 10),
      strictPort: true,
      host: true,
      origin: `http://0.0.0.0:${env.VITE_PORT}`,
    },
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },

    plugins: [
      react(),
      tailwindcss(),
      TanStackRouterVite({ autoCodeSplitting: true }),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      poolOptions: {
        forks: {
          singleFork: true,
        },
      },
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html", "lcov"],
        testMatch: ["unit/**/*.ts", "components/**/*.tsx"],
        exclude: [
          "**/html",
          "**/dist",
          "**/src/app.tsx",
          "**/src/main.tsx",
          "**/vite.config.ts",
          "**/src/router.tsx",
          "**/src/vite-env.d.ts",
          "**/custom-pattern/**",
          "**/src/providers.tsx",
          "**/postcss.config.ts",
          "**/_authenticated.tsx",
          "**/tailwind.config.ts",
          "**/*.config.{js,ts,cjs}",
          "**/commitlint.config.cjs",
          "**/src/routeTree.gen.ts",
          "**/src/routes/__root.tsx",
          "**/src/routes/_authenticated",
        ],
      },
    },
  };
});
