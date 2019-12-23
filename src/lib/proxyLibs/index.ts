import AxiosLib from "./axios";
import PostmanRequestLib from "./postmanRequest";
import NodeFetchLib from "./nodeFetch";
import { ProxyLib } from "../../types/proxyLib";
import { PROXY_LIBS } from "../../config";

export const proxyLibs: Record<PROXY_LIBS, ProxyLib> = {
  [PROXY_LIBS.AXIOS]: AxiosLib,
  [PROXY_LIBS.POSTMAN_REQUEST]: PostmanRequestLib,
  [PROXY_LIBS.NODE_FETCH]: NodeFetchLib,
};
