import path from "path";

const joinUrl = (...parts: string[]): string => path.posix.join(...parts);

export default joinUrl;
