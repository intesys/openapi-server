/// <reference path="./postmanRequest.d.ts" />
import request from "postman-request";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";
import url from "url";
import e from "express";
import { filterHeaders } from "./utils";

const composeOptions = (options: {}, req: e.Request) => {
  switch (req.headers["content-type"]) {
    case "application/json":
      return {
        ...options,
        body: JSON.stringify(req.body),
      };
    case "text/plain":
      return {
        ...options,
        body: req.body,
      };
    case "application/x-www-form-urlencoded":
      return {
        ...options,
      };
    case "multipart/form-data":
      return {
        ...options,
      };
    case "multipart/related":
      return {
        ...options,
      };
    default:
      return options;
  }
};

const PostmanRequestLib: ProxyLib = (method, rawUrl, headers = {}) => async (req, res) => {
  let optionsTemplate = {};

  try {
    optionsTemplate = {
      method,
      headers: filterHeaders(headers),
      url: url.parse(rawUrl),
      strictSSL: false,
    };
  } catch (err) {
    return Promise.reject(err);
  }

  const options = composeOptions(optionsTemplate, req);

  return new Promise((resolve, reject) => {
    request(options, (error: any, response: { headers: any }, body: any) => {
      if (error) {
        return reject(new RemoteError(`${method} ${url}`, error));
      }
      resolve({ data: body, headers: filterHeaders(response.headers) });
    });
  });
};

export default PostmanRequestLib;
