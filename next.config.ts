import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === "production" ? "/browser-mmo-project" : "";

const nextConfig: NextConfig = {
    output: 'export',
    images: { unoptimized: true },
    basePath: basePath,
    env: {
        basePath,
    },
};

export default nextConfig;
