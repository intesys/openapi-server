/// <reference path="./postmanRequest.d.ts" />
import request from "postman-request";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";
import url from "url";
import { log } from "../log";

const PostmanRequestLib: ProxyLib = (method, rawUrl, headers = {}) => (req, res) => {
  const temp = {
    Authorization: headers.authorization,
  };

  try {
    console.log("before request()");
    return request(
      {
        method,
        headers: temp,
        url: url.parse(rawUrl),
        // body: req.body,
        strictSSL: false,
      },
      (error: {}, response: {}, body: {}) => {
        res.locals.body = body;
        res.set(response.headers);
        res.set("Forwarded", `for=${url}`);
        log({
          "Request forwarded to": `${method.toUpperCase()} ${rawUrl}`,
          "Request body": req.body,
          "Response body": body,
        });
      }
    );
  } catch (err) {
    throw new RemoteError(`${method} ${url}`, err);
  }
};

export default PostmanRequestLib;
