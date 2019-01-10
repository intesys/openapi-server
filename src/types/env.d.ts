declare type Env = {
  API_YML: string,
  API_PREFIX: string,
  API_PORT: string,
  API_PROTOCOL: string,
  API_HOSTNAME: string,
  RESOURCES_PREFIX: string,
  MOCKS_PATH: string,
  PROXY_PROTOCOL: string,
  PROXY_HOSTNAME: string,
  PROXY_PORT: string,
  PROXY_PREFIX: string,
  PROXY_RESOURCES_PREFIX: string,
  SKIP_VALIDATION?: boolean,
  LOG?: boolean
};

export default Env;
