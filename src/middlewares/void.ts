import { RequestHandler } from 'express';

const voidMiddleware: RequestHandler = (req, res, next) => next();

export default voidMiddleware;
