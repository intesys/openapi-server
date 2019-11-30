export interface ISourceYml {
  type: string;
  path: string;
}
declare type Env = {
  API_YML: string | ISourceYml[];
  API_PREFIX: string;
  API_PORT: string;
  API_PROTOCOL: string;
  API_HOSTNAME: string;
  RESOURCES: boolean;
  RESOURCES_PREFIX: string;
  MOCKS: boolean;
  MOCKS_PATH: string;
  PROXY: boolean;
  PROXY_PROTOCOL: string;
  PROXY_HOSTNAME: string;
  PROXY_PORT: string;
  PROXY_PREFIX: string;
  PROXY_RESOURCES_PREFIX: string;
  SKIP_VALIDATION?: boolean;
  LOG?: boolean;
  WATCH?: boolean;
};

export default Env;
