export enum HTTPProtocol {
  "http" = "http",
  "https" = "https"
}

type Env = {
  API_YML: string;
  API_PREFIX: string;
  API_PORT: string;
  API_PROTOCOL: HTTPProtocol;
  API_HOSTNAME: string;
  SERVE_STATIC: boolean;
  SERVE_STATIC_PREFIX: string;
  SERVE_STATIC_PATH: string;
  MOCKS: boolean;
  MOCKS_PATH: string;
  PROXY: boolean;
  PROXY_PROTOCOL: HTTPProtocol;
  PROXY_HOSTNAME: string;
  PROXY_PORT: string;
  PROXY_PREFIX: string;
  SKIP_VALIDATION?: boolean;
  LOG?: boolean;
  WATCH?: boolean;
};

export default Env;
