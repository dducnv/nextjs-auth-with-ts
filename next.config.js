/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_URL: "https://forums-aptech.herokuapp.com"
  }
}

module.exports = nextConfig
