import { OpenAPIV2, OpenAPIV3, OpenAPI } from 'openapi-types';
import openApiSchemaValidate from './openApiSchemaValidate';

describe('openApiSchemaValidate', () => {

  const v2: OpenAPIV2.Document = {
    swagger: '2.0',
    info: {
      title: 'test',
      version: '0'
    },
    paths: {
      '/': {
        get: {
          responses: {
            '200': {
              description: ''
            }
          }
        }
      }
    }
  }

  const v3: OpenAPIV3.Document = {
    openapi: '3.0.0',
    info: {
      title: 'test',
      version: '0'
    },
    paths: {
      '/': {
        get: {
          responses: {
            '200': {
              description: ''
            }
          }
        }
      }
    }
  }

  const invalidV2 = (): OpenAPIV2.Document => ({
    swagger: '2.0',
    info: {
      title: 'test'
      // missing version
    },
    paths: {
      '/': {
        get: {
          responses: {
            '200': '',
            default: ''
          }
        }
      }
    }
  })

  const invalidV3 = (): OpenAPIV3.Document => ({
    openapi: '3.0.0',
    info: {
      title: 'test'
      // missing version
    },
    paths: {
      '/': {
        get: {
          responses: {
            '200': {
              // missing description
            }
          }
        }
      }
    }
  })

  it('validates v2', () => {
    const sut = openApiSchemaValidate(v2);
    expect(sut).toBeTruthy();
  })

  it('validates v3', () => {
    const sut = openApiSchemaValidate(v3);
    expect(sut).toBeTruthy();
  })

  it('throws on invalid v2', () => {
    expect(() => openApiSchemaValidate(invalidV2())).toThrow();
  })

  it('throws on invalid v3', () => {
    expect(() => openApiSchemaValidate(invalidV3())).toThrow();
  })

})
