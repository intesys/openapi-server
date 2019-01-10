import Version from '../types/openApiVersion';

export default (spec: any) => {
  if (spec.openapi && spec.openapi.match(/^3/)) {
    return Version.v3;
  }
  if (spec.swagger && spec.swagger.match(/^2/)) {
    return Version.v2;
  }
  throw new Error('Unsupported openApi schema version');
}
