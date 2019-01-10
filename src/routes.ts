import express, { Router } from 'express';
import { OpenAPI } from 'openapi-types';
import openApiVersion from './lib/openApiVersion';
import Version from './types/openApiVersion';
import buildV2Routes from './routes/v2';
import buildV3Routes from './routes/v3';

export const operations = {
  get: 'get',
  put: 'put',
  post: 'post',
  del: 'delete',
  delete: 'delete',
  options: 'options',
  head: 'head',
  patch: 'patch'
};

export default (spec: OpenAPI.Document): Router => {
  const router = express.Router();
  const version = openApiVersion(spec);
  const paths = spec.paths;

  switch (version) {
    case Version.v2:
      return buildV2Routes(router, paths);
    case Version.v3:
      return buildV3Routes(router, paths);
  }
  throw new Error('Unsupported openApi version');
}
