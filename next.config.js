
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',

    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://lead-surge-backend2.vercel.app/api',
  },
};

module.exports = nextConfig;
