import { ProxyLib, ProxyCall } from "../../types/proxyLib";
import httpProxyMiddleware from "http-proxy-middleware";
import { PROXY_PROTOCOL, PROXY_HOSTNAME, PROXY_PORT, LOG, proxyUrl } from "../globals";

const HttpProxyMiddlewareLib: ProxyLib = (method, url, headers = {}) => async (req, res) =>
  new Promise((resolve, reject) => {
    console.log("Called proxy middleware", url, req.url, proxyUrl);
    const next = (err: any) => {
      console.log("next called", err);
    };
    httpProxyMiddleware({
      target: proxyUrl,
      changeOrigin: true,
      preserveHeaderKeyCase: true,
      //cookiePathRewrite: "",
      cookieDomainRewrite: "",
      logLevel: LOG ? "debug" : "warn",
      secure: false,
      // selfHandleResponse: true,
      // onProxyReq: (proxyReq, req, res) => {
      //   console.log("ProxyReq", proxyReq);
      // },
      // onError: err => {
      //   console.log("onError", err);
      //   reject(err);
      // },
      // onProxyRes: (proxyRes, req, res) => {
      //   console.log("onProxyRes called", proxyRes, req, res);
      //   let body: any = [];

      //   proxyRes.on("data", chunk => {
      //     console.log("onProxyRes on data");
      //     body.push(chunk);
      //   });

      //   proxyRes.on("end", () => {
      //     console.log("onProxyRes on end");
      //     body = Buffer.concat(body).toString();
      //     resolve({
      //       data: body,
      //       headers: res.getHeaders(),
      //       status: res.statusCode,
      //     });
      //   });

      //   proxyRes.on("error", err => {
      //     reject(err);
      //   });
      // },
    })(req, res, next);
  });

export default HttpProxyMiddlewareLib;
