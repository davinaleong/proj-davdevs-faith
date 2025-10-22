import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  output: "export", // Commented out for development - enable for deployment
  outputFileTracingRoot: __dirname,
  /* config options here */
}

export default nextConfig
