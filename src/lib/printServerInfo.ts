import {
  API_PORT,
  API_PREFIX,
  API_PROTOCOL,
  API_YML,
  LOG,
  MOCKS_PATH,
  PROXY,
  proxyUrl,
  SKIP_VALIDATION,
  STATIC,
  STATIC_PATH,
  STATIC_PREFIX,
  WATCH,
} from "./globals";
import { clear, print } from "./log";

export default () => {
  clear();
  print(`
  Openapi server running at ${API_PROTOCOL}://localhost:${API_PORT}

  Api yml: ${API_YML}
  Api prefix: ${API_PREFIX}
  Mock path: ${MOCKS_PATH}
  Proxy is ${PROXY ? "enabled" : "disabled"}${
    PROXY
      ? `
  Proxy URL: ${proxyUrl}`
      : ``
  }    
  Static files are ${STATIC ? "enabled" : "disabled"}${
    STATIC
      ? `
  Static prefix: ${STATIC_PREFIX}
  Static path: ${STATIC_PATH}`
      : ``
  }  
  Validation is ${SKIP_VALIDATION ? "disabled" : "enabled"}
  Log is ${LOG ? "enabled" : "disabled"}
  Watch mode is ${WATCH ? "enabled" : "disabled"}
`);
};
