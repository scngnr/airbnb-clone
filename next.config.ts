import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',    // GitHub avatars
      'lh3.googleusercontent.com',        // Google user images
      'platform-lookaside.fbsbx.com',     // Facebook images
      'pbs.twimg.com',                    // Twitter images
      'res.cloudinary.com',               // Cloudinary (if you use it)
    ]
  }
};

export default nextConfig;