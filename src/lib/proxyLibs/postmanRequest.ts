/// <reference path="./postmanRequest.d.ts" />
import request from "postman-request";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";
import url from "url";

const PostmanRequestLib: ProxyLib = (method, rawUrl, headers = {}) => async (req, res) => {
  const temp = {
    Authorization: headers.authorization,
  };

  try {
    return request(
      {
        method,
        headers: temp,
        url: url.parse(rawUrl),
        // body: req.body,
        strictSSL: false,
      },
      (error: {}, responseCode: {}, body: {}) => {
        console.log("error", error);
        console.log("body", body);
      }
    );
  } catch (err) {
    throw new RemoteError(`${method} ${url}`, err);
  }
};

export default PostmanRequestLib;
