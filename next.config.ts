import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Only used for our own hand-authored placeholder SVG in /public, never
    // for user- or supplier-supplied images.
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
