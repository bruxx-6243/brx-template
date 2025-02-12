import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig, loadEnv } from "vite";

/**
 * Vite configuration for the project.
 *
 * - Configures plugins for React, TailwindCSS, and TanStack Router.
 * - Sets environment variables and server settings.
 * - Includes custom alias for imports.
 * - Configures testing settings and code coverage options.
 *
 * @param {object} mode - The Vite mode ('development', 'production', etc.).
 * @returns {object} Vite configuration object.
 */
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development/production)
  const env = loadEnv(mode, process.cwd(), "");

  return {
    /**
     * The base public path for the project.
     * "./" is commonly used for projects that don't rely on the root of the server.
     */
    base: "./",

    preview: {
      /**
       * Preview server settings for testing before deployment.
       * - `strictPort: true`: Ensures that the specified port must be available.
       * - `port`: Port number loaded from the environment variables.
       */
      strictPort: true,
      port: Number.parseInt(env.VITE_PORT, 10),
    },

    server: {
      /**
       * Development server settings.
       * - `host: true`: Exposes the server to the network.
       * - `strictPort: true`: Ensures the specified port is used.
       * - `origin`: The origin URL for the server.
       */
      host: true,
      strictPort: true,
      port: Number.parseInt(env.VITE_PORT, 10),
      origin: `http://0.0.0.0:${env.VITE_PORT}`,
    },

    resolve: {
      /**
       * Configure path aliases for easier imports.
       * - `@`: Alias for the `src` directory to simplify imports in your project.
       */
      alias: {
        "@": path.resolve(import.meta.dirname, "./src"),
      },
    },

    plugins: [
      /**
       * React plugin with SWC for optimized JSX compilation.
       */
      react(),

      /**
       * TailwindCSS plugin for styling.
       */
      tailwindcss(),

      /**
       * TanStack Router plugin for routing support with automatic code splitting.
       */
      TanStackRouterVite({ autoCodeSplitting: true }),
    ],

    test: {
      /**
       * Test configuration for running unit tests.
       * - `globals: true`: Makes global test functions like `describe` available.
       * - `environment: jsdom`: Sets the testing environment to simulate the DOM in Node.js.
       * - `poolOptions`: Defines options for test worker pooling.
       * - `coverage`: Configures code coverage collection and reporting.
       */
      globals: true,
      environment: "jsdom",
      poolOptions: {
        forks: {
          singleFork: true, // Ensure single worker fork for test runs
        },
      },
      coverage: {
        /**
         * Coverage provider and reporter settings.
         * - `provider: v8`: Uses the v8 coverage tool.
         * - `reporter`: Specifies the formats for coverage reports.
         */
        provider: "v8",
        reporter: ["text", "json", "html", "lcov"],
        testMatch: ["unit/**/*.ts", "components/**/*.tsx"],
        exclude: [
          // Paths and files to exclude from test coverage collection
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
