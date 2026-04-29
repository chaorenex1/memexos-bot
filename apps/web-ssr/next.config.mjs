/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 直接 transpile monorepo 内部 packages（ESM/TSX 源码）
  transpilePackages: [
    '@repo/ui',
    '@repo/store',
    '@repo/request',
    '@repo/router',
    '@repo/platform',
    '@repo/hooks',
    '@repo/icons',
    '@repo/i18n',
    '@repo/theme',
    '@repo/types',
    '@repo/utils',
    '@repo/validators',
    '@repo/constants',
  ],
  experimental: {
    optimizePackageImports: ['lucide-react', 'lodash-es'],
  },
};

export default nextConfig;
