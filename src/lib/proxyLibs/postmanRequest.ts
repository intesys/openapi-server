import { IncomingMessage } from "http";
import { ProxyLib, method } from "../../types/proxyLib";
import { RemoteError } from "../proxy";
const request = require("postman-request");

const addBody = (method: method, contentType: string, body: any, defaults: {}): {} => {
  const allowedMethods = ["PATCH", "POST", "PUT"];
  const _method = method.toLowerCase();

  if (allowedMethods.indexOf(_method) < 0) {
    // only allowedMethods can have body
    return defaults;
  }

  if (!body) {
    // avoid empty body
    return defaults;
  }

  switch (contentType) {
    case contentType.includes("application/json") && contentType:
      return {
        ...defaults,
        body: JSON.stringify(body),
      };
    case "text/plain":
    case "application/x-www-form-urlencoded":
    case "multipart/form-data":
    case "multipart/related":
    default:
      return {
        ...defaults,
        body: body,
      };
  }
};

const PostmanRequestLib: ProxyLib = (method, url, headers = {}) => async (req, res) => {
  let options = {};

  try {
    const contentType = req.headers["content-type"] || "text/plain";
    const defaults = {
      method,
      headers,
      url,
      followRedirect: false,
      gzip: true,
      strictSSL: false,
    };
    options = addBody(method, contentType, req.body, defaults);
  } catch (err) {
    return Promise.reject(err);
  }

  return new Promise((resolve, reject) => {
    request(options, (error: any, response: IncomingMessage, data: any) => {
      if (error) {
        return reject(new RemoteError(`${method} ${url}`, error));
      }
      const headers = response.headers;
      const status = response.statusCode || 0;
      resolve({ data, headers, status });
    });
  });
};

export default PostmanRequestLib;
