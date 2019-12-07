import { Request } from "express";
import got, { GotOptions } from "got";
import { URLOptions } from "got/dist/source/utils/options-to-url";
import http from "http";
import https from "https";
import { Merge } from "type-fest";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";

const httpAgent = new http.Agent();
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const getContent = (req: Request): Partial<Merge<GotOptions, URLOptions>> => {
  const content: Partial<Merge<GotOptions, URLOptions>> = {};
  const contentType = (req.headers["content-type"] || "").toLowerCase();
  if (contentType.includes("json")) {
    content.json = req.body;
    return content;
  }
  content.body = req.body;
  return content;
};

const GotLib: ProxyLib = (method, url, headers = {}) => async (req, res) => {
  try {
    const isSecure = url.startsWith("https");
    const agent = isSecure ? httpsAgent : httpAgent;
    const content = getContent(req);
    const response = await got(url, { method, headers, agent, ...{ content } });
    return {
      data: response.body,
      headers: response.headers,
    };
  } catch (err) {
    throw new RemoteError(`${method} ${url}`, err);
  }
};

export default GotLib;
