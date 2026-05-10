import { log } from "@dwtechs/winstan";
import type { Request, Response, NextFunction } from 'express';

/**
 * Express middleware that logs the request start and sets the request performance timestamp.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function
 * @return {void}
 */
function startTimer(req: Request, res: Response, next: NextFunction): void {
  res.locals.perf = Date.now();
  log.info(() => `Request started on ${req.method}${req.url}`);
  next();
}

/**
 * Express middleware that logs the request end and the time elapsed since startTimer.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function in the middleware chain
 * @return {void}
 */
function endTimer(req: Request, res: Response, next: NextFunction): void {
  log.info(() => {
    const perf: number | undefined = res.locals.perf;
    const delta = perf ? Date.now() - perf : 0;
    return `Request ended on ${req.method}${req.url} in ${delta}ms`;
  });
  next();
}

export {
  startTimer,
  endTimer,
};