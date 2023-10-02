import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app) {
  app.use(
    "/v1",
    createProxyMiddleware({
       target: "https://openapi.naver.com",
      changeOrigin: true,
    })
  );
};