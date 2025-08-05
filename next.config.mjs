import withPWA from 'next-pwa'

const withPWACustom = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  sw: 'service-worker.js',
  disable: process.env.NODE_ENV === 'development',
  buildExcludes: [
    /middleware-manifest.json$/,
    /app-build-manifest.json$/, // ✅ fixes your issue
  ],
})

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
}

export default withPWACustom({
  ...nextConfig,
})
