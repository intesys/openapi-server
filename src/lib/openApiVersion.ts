/* eslint-disable @typescript-eslint/no-explicit-any */
import Version from "../types/openApiVersion";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (spec: any): Version => {
  if (spec.openapi && spec.openapi.match(/^3/)) {
    return Version.v3;
  }
  if (spec.swagger && spec.swagger.match(/^2/)) {
    return Version.v2;
  }
  throw new Error("Unsupported openApi schema version");
};
