// next.config.js
const nextConfig = {
  async rewrites() {
		return [
			{
				source: "/:path*",
				destination: "http://localhost:8080/:path*",
			},
		];
	},
    images: {
      domains: ['images.unsplash.com'], // 이미지 호스트 추가
    },
  };
  
  module.exports = nextConfig