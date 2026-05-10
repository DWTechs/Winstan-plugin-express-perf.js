const { startTimer, endTimer } = require("../dist/winstan-plugin-express-perf.js");

// Mock the log module
jest.mock("@dwtechs/winstan", () => ({
  log: {
    info: jest.fn()
  }
}));

const { log } = require("@dwtechs/winstan");

describe("startTimer middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      method: "GET",
      url: "/test"
    };
    res = {
      locals: {}
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call next()", () => {
    startTimer(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it("should set res.locals.perf to a number", () => {
    startTimer(req, res, next);
    expect(typeof res.locals.perf).toBe("number");
  });

  it("should log the request start via a lazy function", () => {
    startTimer(req, res, next);
    expect(log.info).toHaveBeenCalledTimes(1);
    const arg = log.info.mock.calls[0][0];
    expect(typeof arg).toBe("function");
    expect(arg()).toBe("Request started on GET/test");
  });

  it("should record the start time before calling next", () => {
    const before = Date.now();
    startTimer(req, res, next);
    const after = Date.now();
    expect(res.locals.perf).toBeGreaterThanOrEqual(before);
    expect(res.locals.perf).toBeLessThanOrEqual(after);
  });
});

describe("endTimer middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      method: "POST",
      url: "/api/data"
    };
    res = {
      locals: {
        perf: Date.now() - 50
      }
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call next()", () => {
    endTimer(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });

  it("should log the request end with elapsed time via a lazy function", () => {
    endTimer(req, res, next);
    expect(log.info).toHaveBeenCalledTimes(1);
    const arg = log.info.mock.calls[0][0];
    expect(typeof arg).toBe("function");
    expect(arg()).toMatch(/^Request ended on POST\/api\/data in \d+ms$/);
  });

  it("should report delta of 0 when perf is not set", () => {
    res.locals.perf = undefined;
    endTimer(req, res, next);
    const arg = log.info.mock.calls[0][0];
    expect(arg()).toBe("Request ended on POST/api/data in 0ms");
  });

  it("should report a non-negative elapsed time", () => {
    endTimer(req, res, next);
    const arg = log.info.mock.calls[0][0];
    const delta = parseInt(arg().match(/in (\d+)ms/)[1]);
    expect(delta).toBeGreaterThanOrEqual(0);
  });
});
