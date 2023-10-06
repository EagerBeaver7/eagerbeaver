// next.config.js
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "https://j9a507.p.ssafy.io/:path*",
      },
      {
        source: "/v1/:path*",
        destination: "https://openapi.naver.com/v1/:path*",
      },
    ];
  },
  images: {
    domains: ["images.unsplash.com"], // 이미지 호스트 추가
  },
  async headers() {
    return [
      {
        source: "/api/:path*", // API 엔드포인트에 따라 조정
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // 모든 출처 허용
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;