/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@tremor/react'],
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['picsum.photos', 'loremflickr.com'],
  },
};

module.exports = nextConfig;
