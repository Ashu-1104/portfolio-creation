/** @type {import('next').NextConfig} */
const nextConfig = {
  // STATIC_EXPORT=1 builds plain files (out/) for hosting on any web server
  ...(process.env.STATIC_EXPORT === '1' ? { output: 'export' } : {}),
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
