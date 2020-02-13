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
  DELAY,
  DELAY_RANGE_START,
  DELAY_RANGE_END,
} from "./globals";
import { clear, print } from "./log";
import { getDelayMinMaxValues } from "../middlewares/addDelay";

export default () => {
  clear();

  let delayMinMaxMessage = "";
  if (DELAY) {
    const delayMinMaxValues = getDelayMinMaxValues();

    delayMinMaxMessage =
      delayMinMaxValues.delayRangeStart === delayMinMaxValues.delayRangeEnd
        ? `[${delayMinMaxValues.delayRangeStart}ms]`
        : `[${delayMinMaxValues.delayRangeStart}-${delayMinMaxValues.delayRangeEnd}ms]`;
  }

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
  Delay is ${DELAY ? "enabled " + delayMinMaxMessage : "disabled"}
`);
};
