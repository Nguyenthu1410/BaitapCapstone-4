import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Khi Frontend gọi vào '/api-cybersoft/...'
        source: '/api-cybersoft/:path*',
        // Next.js Server sẽ lén chuyển nó sang domain của Cybersoft
        destination: 'https://elearningnew.cybersoft.edu.vn/api/:path*',
      },
    ];
  },
};

export default nextConfig;