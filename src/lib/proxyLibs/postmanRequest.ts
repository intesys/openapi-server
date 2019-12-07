import request from "postman-request";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";

const PostmanRequestLib: ProxyLib = (method, url, headers = {}) => async (req, res) => {
  try {
    return request({
      method,
      headers,
      url,
      body: req.body,
      strictSSL: false,
    });
  } catch (err) {
    throw new RemoteError(`${method} ${url}`, err);
  }
};

export default PostmanRequestLib;
