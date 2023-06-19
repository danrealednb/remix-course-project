// /** @type {import('@remix-run/dev').AppConfig} */
// module.exports = {
//   ignoredRouteFiles: ["**/.*"],
//   // appDirectory: "app",
//   // assetsBuildDirectory: "public/build",
//   // serverBuildPath: "build/index.js",
//   // publicPath: "/build/",
//   serverModuleFormat: "cjs",
//   future: {
//     v2_errorBoundary: false,
//     // v2_headers: true,
//     v2_meta: false,
//     v2_normalizeFormMethod: false,
//     v2_routeConvention: false,
//   },≈ç
// };

const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.ts"
      : undefined,
  serverBuildPath: ".netlify/functions-internal/server.js",

  future: {
    // makes the warning go away in v1.15
    v2_routeConvention: true,
    // v2_meta: true,
  },

  routes(defineRoutes) {
    // uses the v1 convention, works in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes);
  },
};
