/// <reference path="./postmanRequest.d.ts" />
import { IncomingMessage } from "http";
import request from "postman-request";
import url from "url";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";

const composeOptions = (contentType: string, body: any, defaults: {}): {} => {
  switch (contentType) {
    case "application/json":
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

const PostmanRequestLib: ProxyLib = (method, rawUrl, headers = {}) => async (req, res) => {
  let options = {};

  try {
    const contentType = headers["content-type"] || "text/plain";
    const defaults = {
      method,
      headers,
      url: url.parse(rawUrl),
      strictSSL: false,
    };
    options = composeOptions(contentType, req.body, defaults);
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
