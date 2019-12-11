/// <reference path="./postmanRequest.d.ts" />
import request from "postman-request";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";
import url from "url";
import { filterHeaders } from "./utils";
import { reject } from "bluebird";

const PostmanRequestLib: ProxyLib = (method, rawUrl, headers = {}) => async (req, res) => {
  // If the parameter 'header' is passed directly to request(), it takes back garbage code
  // in the body instead of a json with preventivo data
  // const temp = {
  //   Authorization: headers.authorization,
  // };

  let options: {};

  try {
    options = {
      method,
      headers: filterHeaders(headers),
      url: url.parse(rawUrl),
      ...(Object.keys(req.body).length != 0 && { body: JSON.stringify(req.body) }),
      strictSSL: false,
    };
  } catch (err) {
    return reject(err);
  }

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
