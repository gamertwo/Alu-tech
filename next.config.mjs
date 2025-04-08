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
  swcMinify: true,
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  
  // This is the critical part for fixing your issue
  experimental: {
    // This helps avoid the "self is not defined" error
    serverComponentsExternalPackages: [
      'framer-motion',
      // Add other problematic packages here if needed
    ],
  },
  
  webpack: (config, { isServer }) => {
    // Only apply to the server build
    if (isServer) {
      // Externalize packages that should not be bundled
      config.externals = [
        ...(config.externals || []),
        'framer-motion',
      ];
      
      // Modify the module parser to handle browser-specific globals
      config.module.parser = {
        ...config.module.parser,
        javascript: {
          ...config.module.parser?.javascript,
          // This tells webpack not to parse these globals in server code
          node: {
            self: false,
            window: false,
            document: false,
            navigator: false,
            location: false,
          }
        }
      };
    }
    
    return config;
  },
};

// Use ES module export syntax instead of CommonJS
export default nextConfig;