import { LOG, VERBOSE } from "./globals";
import { inspect } from "util";

const depth: number | null = VERBOSE !== true ? VERBOSE || 0 : null;

export const print = (message: any) => {
  console.info(stringify(message));
};

export const clear = () => console.clear();

export const log = (message: any) => {
  if (LOG) {
    console.log(stringify(message));
  }
};

export const error = (message: any, stack: any = "") => {
  if (LOG) {
    console.error(stringify(message), stack);
  }
};

const stringify = (message: any): string => {
  if (typeof message === "string") {
    return message;
  }
  return inspect(message, { colors: true, compact: false, breakLength: Infinity, depth }) as string;
};
