const getPort = (port?: string): string => (port ? `:${port}` : "");

export default getPort;
