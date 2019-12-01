import {
  API_HOSTNAME,
  API_PORT,
  API_PREFIX,
  API_PROTOCOL,
  API_YML,
  LOG,
  MOCKS_PATH,
  PROXY,
  proxyUrl,
  RESOURCES,
  RESOURCES_FOLDER,
  RESOURCES_PREFIX,
  SKIP_VALIDATION,
  WATCH
} from "./globals";
import { clear, print } from "./log";

export default () => {
  clear();
  print(`
  Server running at ${API_PROTOCOL}://${API_HOSTNAME}:${API_PORT}

  Api yml: ${API_YML}
  Api prefix: ${API_PREFIX}
  Mock path: ${MOCKS_PATH}
  Proxy is ${PROXY ? "enabled" : "disabled"}${
    PROXY
      ? `
  Proxy URL: ${proxyUrl}`
      : ``
  }    
  Resources are ${RESOURCES ? "enabled" : "disabled"}${
    RESOURCES
      ? `
  Resources prefix: ${RESOURCES_PREFIX}
  Resources folder: ${RESOURCES_FOLDER}`
      : ``
  }  
  Validation is ${SKIP_VALIDATION ? "disabled" : "enabled"}
  Log is ${LOG ? "enabled" : "disabled"}
  Watch mode is ${WATCH ? "enabled" : "disabled"}
`);
};
