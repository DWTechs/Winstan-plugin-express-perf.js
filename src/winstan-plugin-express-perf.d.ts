
import type { Request, Response, NextFunction } from 'express';

interface MyRequest extends Request {
  perf: number;
}

declare function start(req: MyRequest, _res: Response, next: NextFunction): void;
declare function end(req: MyRequest, _res: Response, next: NextFunction): void;
declare const _default: {
  start: typeof start;
  end: typeof end;
};
export default _default;
