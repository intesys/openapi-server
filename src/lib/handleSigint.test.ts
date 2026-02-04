import { Server } from "net";

// Mock the log module
jest.mock("./log", () => ({
  print: jest.fn(),
}));

describe("handleSigint", () => {
  let mockServer: Server;
  let processOnSpy: jest.SpyInstance;
  let processOffSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.resetModules();
    mockServer = ({
      close: jest.fn((callback?: (err?: Error) => void) => {
        if (callback) callback();
        return mockServer;
      }),
    } as unknown) as Server;
    processOnSpy = jest.spyOn(process, "on").mockImplementation(() => process);
    processOffSpy = jest.spyOn(process, "off").mockImplementation(() => process);
  });

  afterEach(() => {
    processOnSpy.mockRestore();
    processOffSpy.mockRestore();
  });

  it("registers SIGINT handler", () => {
    const handleSigint = require("./handleSigint").default;

    handleSigint(mockServer);

    expect(processOnSpy).toHaveBeenCalledWith("SIGINT", expect.any(Function));
  });

  it("unregisters previous handler when called again", () => {
    const handleSigint = require("./handleSigint").default;

    handleSigint(mockServer);
    handleSigint(mockServer);

    expect(processOffSpy).toHaveBeenCalledWith("SIGINT", expect.any(Function));
  });

  it("only one handler is active at a time", () => {
    const handleSigint = require("./handleSigint").default;

    handleSigint(mockServer);
    handleSigint(mockServer);
    handleSigint(mockServer);

    // Should have unregistered twice (for second and third calls)
    expect(processOffSpy).toHaveBeenCalledTimes(2);
  });
});
