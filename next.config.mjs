/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Served from the custom domain root (yavuzdagdelen.com), so no basePath.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
