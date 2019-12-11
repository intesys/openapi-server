import http from "http";
import https from "https";
import fetch, { Headers } from "node-fetch";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";

const httpAgent = new http.Agent();
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const NodeFetchLib: ProxyLib = (method, rawUrl, headers = {}) => async (req, res) => {
  try {
    const agent = rawUrl.startsWith("https") ? httpsAgent : httpAgent;
    const response = await fetch(rawUrl, {
      method,
      headers: new Headers(headers as { [key: string]: string }),
      body: req.body,
      follow: 0,
      agent,
    });
    return {
      data: response.body,
      status: response.status,
      headers: response.headers.raw(),
    };
  } catch (err) {
    throw new RemoteError(rawUrl, err);
  }
};

export default NodeFetchLib;
