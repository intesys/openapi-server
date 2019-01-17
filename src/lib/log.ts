import { LOG } from './globals';
import { inspect, isString } from 'util';

export const print = (message: any) => {
  if (isString(message)) {
    console.info(message);
    return;
  }
  console.info(stringify(message));
}

export const log = (message: any) => {
  if (LOG) {
    console.log(stringify(message));
  }
}

export const error = (message: any, stack: any = '') => {
  if (LOG) {
    console.error(stringify(message), stack);
  }
}

const stringify = (message: any): string => {
  return inspect(message, { colors: true, compact: false }) as string;
}
