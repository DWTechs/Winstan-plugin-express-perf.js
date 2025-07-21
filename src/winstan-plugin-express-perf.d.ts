
import type { Request, Response, NextFunction } from 'express';

declare function startTimer(req: Request, res: Response, next: NextFunction): void;
declare function endTimer(req: Request, res: Response, next: NextFunction): void;

export { startTimer, endTimer };
