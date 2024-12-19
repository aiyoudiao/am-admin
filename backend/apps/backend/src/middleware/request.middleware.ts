/*
 * @Description: 全局请求拦截中间件
 */
import { NextFunction, Request, Response } from 'express';
export function requestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    req.method === 'GET' ||
    req.url.includes('/auth/login') ||
    req.url.includes('/auth/logout') ||
    req.url.includes('/common/')
  ) {
    next();
  } else {
    res.send({ code: -1, msg: '演示系统,禁止操作!', data: null });
  }
}
