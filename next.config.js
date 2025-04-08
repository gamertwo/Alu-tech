/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true, 
    images: {
      unoptimized: false,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
  };
  
  module.exports = nextConfig;