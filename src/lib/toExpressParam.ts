const swaggerParamRegExp = /\{([^/}]+)}/g;

export default (route: string): string => {
  return route.replace(swaggerParamRegExp, (match, param) => `:${param}`);
}
