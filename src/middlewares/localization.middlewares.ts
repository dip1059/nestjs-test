import { Request, NextFunction, Response } from 'express';

export function localization(req: Request, _: Response, next: NextFunction) {
  global.request = req;
  next();
}
