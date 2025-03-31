/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Enables static export
    trailingSlash: true, // Ensures all routes end with a slash
    images: {
      unoptimized: true, // Required for static export
      domains: ['localhost'], // Add any domains you're loading images from
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    // Enable more optimizations that work with static export
    swcMinify: true, // Use SWC minification for better performance
    reactStrictMode: true,
    compress: true, // Enable compression
    poweredByHeader: false, // Remove X-Powered-By header
    // Add webpack optimizations
    webpack: (config, { dev }) => {
      // Only run in production builds
      if (!dev) {
        // Add optimization for CSS
        config.optimization = {
          ...config.optimization,
          minimize: true, // Ensure minimization is enabled
          splitChunks: {
            chunks: 'all',
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
                priority: 10
              },
              // Extract all CSS into separate files
              styles: {
                name: 'styles',
                test: /\.(css|scss)$/,
                chunks: 'all',
                enforce: true,
                priority: 20,
              },
            },
          },
        };
      }
      return config;
    },
  };
  
  export default nextConfig;