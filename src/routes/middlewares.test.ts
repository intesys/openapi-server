describe('Middlewares', () => {

  beforeEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.unmock('../lib/globals');
  });

  it('skip validation middleware if SKIP_VALIDATION is true', () => {
    jest.mock('../lib/globals', () => ({
      SKIP_VALIDATION: true
    }))
    const middlewares = require('./middlewares').default;
    const sut = middlewares('str', 'str', {});

    expect(sut.length).toEqual(2)
  });

  it('uses validation middleware if SKIP_VALIDATION is false', () => {
    jest.mock('../lib/globals', () => ({
      SKIP_VALIDATION: false
    }))
    const middlewares = require('./middlewares').default;
    const sut = middlewares('str', 'str', {});

    expect(sut.length).toEqual(3)
  });

});
