import { RequestHandler } from 'express';
import voidMiddleware from './void';
import proxy from '../lib/proxy';
import _ from 'lodash';
import { PROXY_PROTOCOL, PROXY_HOSTNAME, PROXY_PORT, PROXY_PREFIX } from '../lib/globals';
import getPort from '../lib/getPort';
import getPrefix from '../lib/getPrefix';

/**
 * @param method one value of `operations`
 * @param route path key, as example: '/item/{id}'
 */
const tryProxy = (method: string, route: string): RequestHandler => (req, res, next) => {

  if (_.get(res, 'locals.body')) {
    return voidMiddleware(req, res, next);
  }

  const url = `${PROXY_PROTOCOL}://${PROXY_HOSTNAME}${getPort(PROXY_PORT)}/${getPrefix(PROXY_PREFIX)}`;
  return proxy(url)(req, res, next);
}

export default tryProxy;
