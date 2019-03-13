const getPrefix = (prefix?: string): string =>
  prefix
    ? prefix.replace(/^\//, '')
    : '';

export default getPrefix;
