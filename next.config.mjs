/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Self-contained server bundle for Docker / Cloud Run.
  // Outputs .next/standalone with only the files the runtime needs.
  output: "standalone",
};

export default nextConfig;
