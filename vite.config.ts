import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig(() => ({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/*.css"],
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./@"),
  //     app: path.resolve(__dirname, "./app"),
  //   },
  // },

  tailwind: true,
  postcss: true,
}));
