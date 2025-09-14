/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  assetPrefix: '',
  basePath: '',
  
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/index.html',
      },
      {
        source: '/about',
        destination: '/about.html',
      },
      {
        source: '/services',
        destination: '/services.html',
      },
      {
        source: '/projects',
        destination: '/projects.html',
      },
      {
        source: '/contact',
        destination: '/contact.html',
      }
  
    ]
  }
}

export default nextConfig
