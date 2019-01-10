import tryMock from './tryMock';
import MockExpressRequest from 'mock-express-request';
import MockExpressResponse from 'mock-express-response';
import { Request, Response } from 'express';

describe('TryMock', () => {

  it('passes if json is valid', () => {
    const sut = tryMock('get', 'routes/{routeId}/sub/action');
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    sut(req, res, next);

    expect(next).toBeCalled();
  });

  it('passes if json is not found', () => {
    const sut = tryMock('get', 'routes/{routeId}');
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    sut(req, res, next);

    expect(next).toBeCalled();
  });

  it('throws if json is invalid', () => {
    const sut = tryMock('get', '__test__/invalid');
    const req: Request = new MockExpressRequest();
    const res: Response = new MockExpressResponse();
    const next = jest.fn();

    expect(() => sut(req, res, next)).toThrow();
  });

});
