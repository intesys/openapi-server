import { LOG, VERBOSE } from "./globals";
import { inspect } from "util";

const depth: number | null = VERBOSE !== true ? VERBOSE || 0 : null;

export const print = (message: unknown): void => {
  console.info(stringify(message));
};

export const clear = (): void => {
  if (LOG) {
    // when log is enabled, show all console messages
    return;
  }
  console.clear();
};

export const log = (message: unknown): void => {
  if (LOG) {
    console.log(stringify(message));
  }
};

export const error = (message: unknown, stack: any = ""): void => {
  if (LOG) {
    console.error(stringify(message), stack);
  }
};

const stringify = (message: unknown): string => {
  if (typeof message === "string") {
    return message;
  }
  return inspect(message, {
    colors: true,
    compact: false,
    breakLength: Infinity,
    depth,
  }) as string;
};
