/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.guitarguitar.co.uk",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "robohash.org",
        port: "",
        pathname: "**",
      },
    ],
  },
};

export default config;
