/// <reference path="./postmanRequest.d.ts" />
import request from "postman-request";
import url from "url";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";
import { filterHeaders } from "./utils";

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
      headers: filterHeaders(headers),
      url: url.parse(rawUrl),
      strictSSL: false,
    };
    options = composeOptions(contentType, req.body, defaults);
  } catch (err) {
    return Promise.reject(err);
  }

  return new Promise((resolve, reject) => {
    request(options, (error: any, response: { headers: Record<string, string>; statusCode: number }, body: any) => {
      if (error) {
        return reject(new RemoteError(`${method} ${url}`, error));
      }
      resolve({ data: body, headers: filterHeaders(response.headers), status: response.statusCode });
    });
  });
};

export default PostmanRequestLib;
