// next.config.js
const nextConfig = {
    images: {
      domains: ['images.unsplash.com'], // 이미지 호스트 추가
    },
    reactStrictMode: true,
    swcMinify: true,
    async rewrutes() {
      return [
        {
          source: '/:path*',
          destination: 'http://localhost:8080/:path*'
        }
      ]  
    },
  };
  
  module.exports = nextConfig