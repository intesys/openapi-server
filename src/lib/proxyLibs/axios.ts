import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import http from "http";
import https from "https";
import { ProxyLib } from "../../types/proxyLib";
import { RemoteError } from "../proxy";

const httpAgent = new http.Agent();
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const AxiosLib: ProxyLib = (method, url, headers = {}) => async (req, res) => {
  try {
    const request: AxiosRequestConfig = {
      method,
      headers,
      url,
      maxRedirects: 0,
      withCredentials: true,
      httpAgent,
      httpsAgent,
    };

    if (req.body) {
      // declare data only if there is a body!
      request.data = req.body;
    }

    const response: AxiosResponse = await axios(request);
    return { data: response.data, headers: response.headers, status: response.status };
  } catch (err) {
    throw new RemoteError(`${method} ${url}`, err);
  }
};

export default AxiosLib;
