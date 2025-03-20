/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (isServer) {
      config.module.rules.push({
        test: /\.test\.(js|ts|jsx|tsx)$/,
        use: 'null-loader', // Prevents Next.js from processing test files
      });
    }
    return config;
  },
};

export default nextConfig;
