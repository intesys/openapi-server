/// <reference path="./postmanRequest.d.ts" />
import request from "postman-request";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";
import url from "url";

const PostmanRequestLib: ProxyLib = (method, rawUrl, headers = {}) => async (req, res) => {
  // If the parameter 'header' is passed directly to request(), it takes back garbage code
  // in the body instead of a json with preventivo data
  const temp = {
    Authorization: headers.authorization,
  };

  return new Promise((resolve, reject) => {
    request(
      {
        method,
        headers: temp,
        url: url.parse(rawUrl),
        // body: req.body,
        strictSSL: false,
      },
      (error: {}, response: {}, body: {}) => {
        if (error) {
          return reject(new RemoteError(`${method} ${url}`, error));
        }
        resolve({ data: body, headers: response.headers });
      }
    );
  });
};

export default PostmanRequestLib;
