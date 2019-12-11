import axios, { AxiosResponse } from "axios";
import http from "http";
import https from "https";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";

const httpAgent = new http.Agent();
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const AxiosLib: ProxyLib = (method, url, headers = {}) => async (req, res) => {
  try {
    const response: AxiosResponse = await axios({
      method,
      headers,
      url,
      data: req.body, // TODO: remove data if body is undefined or empty
      maxRedirects: 0,
      withCredentials: true,
      httpAgent,
      httpsAgent,
    });
    return { data: response.data, headers: response.headers, status: response.status };
  } catch (err) {
    throw new RemoteError(`${method} ${url}`, err);
  }
};

export default AxiosLib;
