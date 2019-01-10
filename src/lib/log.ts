import { isString, toString } from 'lodash';
import { LOG } from './globals';

export const log = (message: any) => {
  const _message = stringify(message);
  if (LOG) {
    console.log(_message);
  }
}

export const error = (message: any, stack: any = '') => {
  const _message = stringify(message);
  if (LOG) {
    console.error(_message, stack);
  }
}

const stringify = (message: any): string => {
  if (isString(message)) {
    return message;
  }

  try {
    return JSON.stringify(message);
  } catch (err) {
    return toString(message);
  }
}
