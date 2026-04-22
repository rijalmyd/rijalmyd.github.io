/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Uncomment and set your repo name for GitHub Pages deployment
  basePath: '/rijalmyd.github.io',
  assetPrefix: '/rijalmyd.github.io/',
}

export default nextConfig
