// next.config.js
 const nextConfig = {

  // reactStrictMode: true,
  // swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "http://localhost:9000/:path*",
  //     },
  //   ];
  // },
    images: {
      domains: ['images.unsplash.com'], // 이미지 호스트 추가
    },
  };
  
  module.exports = nextConfig