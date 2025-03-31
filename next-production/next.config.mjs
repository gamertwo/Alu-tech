/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enables static export
    trailingSlash: true, // Ensures all routes end with a slash
    images: {
      unoptimized: true, // Fixes missing images
    },
  };
  
  export default nextConfig;