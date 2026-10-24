import type { NextConfig } from "next"
const isPages = process.env.GITHUB_ACTIONS === "true"
const basePath = isPages ? "/insight-copilot" : ""
const nextConfig: NextConfig = { output: "export", trailingSlash: true, images: { unoptimized: true }, ...(isPages ? { basePath, assetPrefix: `${basePath}/` } : {}) }
export default nextConfig
