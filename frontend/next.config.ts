import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
 basePath: process.env.PROJECT_NAME ? `/${process.env.PROJECT_NAME}` : '',
  
  // Helps resolve trailing slash issues that cause loops
  trailingSlash: true,
};

export default nextConfig;
