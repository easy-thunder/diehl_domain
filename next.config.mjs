/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (isServer) {
      config.externals = [...(config.externals || []), ({ request }, callback) => {
        if (request && request.match(/\.test\.(js|ts|jsx|tsx)$/)) {
          return callback(null, 'commonjs ' + request);
        }
        callback();
      }];
    }
    return config;
  },
};

export default nextConfig;
