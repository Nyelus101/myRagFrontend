import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Added this so I can use: - Network:       http://10.2.0.2:3000
module.exports = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
}