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
  RESOURCES: boolean;
  RESOURCES_PREFIX: string;
  RESOURCES_FOLDER: string;
  MOCKS: boolean;
  MOCKS_PATH: string;
  PROXY: boolean;
  PROXY_PROTOCOL: HTTPProtocol;
  PROXY_HOSTNAME: string;
  PROXY_PORT: string;
  PROXY_PREFIX: string;
  PROXY_RESOURCES_PREFIX: string;
  SKIP_VALIDATION?: boolean;
  LOG?: boolean;
  WATCH?: boolean;
};

export default Env;
