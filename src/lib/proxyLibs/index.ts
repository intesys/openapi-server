import { PROXY_LIBS } from "../../config";
import { ProxyLib } from "../../types/proxyLib";
import AxiosLib from "./axios";
import HttpProxyMiddlewareLib from "./httpProxyMiddleware";
import NodeFetchLib from "./nodeFetch";
import PostmanRequestLib from "./postmanRequest";

export const proxyLibs: Record<PROXY_LIBS, ProxyLib> = {
  [PROXY_LIBS.AXIOS]: AxiosLib,
  [PROXY_LIBS.POSTMAN_REQUEST]: PostmanRequestLib,
  [PROXY_LIBS.NODE_FETCH]: NodeFetchLib,
  [PROXY_LIBS.HTTP_PROXY_MIDDLEWARE]: HttpProxyMiddlewareLib,
};
