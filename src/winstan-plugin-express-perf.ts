import { log } from "@dwtechs/winstan";
import type { Request, Response, NextFunction } from 'express';

/**
 * A function that logs the request start and sets the request performance timestamp.
 *
 * @param {type} req - The request object
 * @param {type} res - The response object
 * @param {type} next - The next function
 * @return {type} undefined
 */
function start(req: Request, res: Response, next: NextFunction): void {
  log.info(`Request started on ${req.method}${req.url}`);
  res.locals.perf = Date.now();
  next();
}

/**
 * Logs the end of a request and calculates the time it took.
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next function in the middleware chain
 * @return {void} This function does not return anything
 */
function end(req: Request, res: Response, next: NextFunction): void {
  const perf = res.locals.perf;
  const delta = perf ? Date.now() - perf : 0;
  log.info(`Request ended on ${req.method}${req.url} in ${delta}ms`);
  next();
}

export {
  start,
  end,
};