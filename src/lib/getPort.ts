const getPort = (port?: string): string | undefined =>
  port
    ? `:${port}`
    : undefined;

export default getPort;
