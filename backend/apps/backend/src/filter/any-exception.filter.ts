/*
 * @Description: 捕获所有异常
 */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

import { FastifyReply, FastifyRequest } from 'fastify';

import { responseMessage } from '@/utils';

import { isDev } from '@/global/env';
import { ErrorEnum } from '@/constants/error-code.constant';
import { BusinessException } from '@/common/exceptions/biz.exception';

interface myError {
  readonly status: number;
  readonly statusCode?: number;

  readonly message?: string;
}

// @Catch() 装饰器绑定所需的元数据到异常过滤器上。它告诉 Nest这个特定的过滤器正在寻找
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  // ArgumentsHost叫做参数主机，它是一个实用的工具 这里我们使用 它的一个方法来获取上下文ctx
  catch(exception: any, host: ArgumentsHost) {
    // 获取上下文
    const ctx = host.switchToHttp();
    // 获取响应体
    const response = ctx.getResponse();
    // 获取请求体
    const request = ctx.getRequest();

    const url = request.raw.url!;

    // 获取状态码，判断是HTTP异常还是服务器异常
    const status = this.getStatus(exception);
    let message = this.getErrorMessage(exception);

    // 系统内部错误时
    if (
      status === HttpStatus.INTERNAL_SERVER_ERROR &&
      !(exception instanceof BusinessException)
    ) {
      Logger.error(exception, undefined, 'Catch');

      // 生产环境下隐藏错误信息
      if (!isDev) message = ErrorEnum.SERVER_ERROR?.split(':')[1];
    } else {
      this.logger.warn(
        `错误信息：(${status}) ${message} Path: ${decodeURI(url)}`,
      );
    }

    const apiErrorCode =
      exception instanceof BusinessException
        ? exception.getErrorCode()
        : status;
    // 打印日志
    const logFormat = `
        --------------------- 全局异常日志 ---------------------
        Request original url: ${request.originalUrl}
        Method: ${request.method}
        IP: ${request.ip}
        Status code: ${status}
        Response: ${exception}
        --------------------- 全局异常日志 ---------------------
        `;
    Logger.error(logFormat);

    // 返回基础响应结果
    const resBody: IBaseResponse = responseMessage({
      code: apiErrorCode,
      message,
      data: null,
    });

    // 自定义异常返回体
    response.status(status).send(resBody);
  }

  getStatus(exception: unknown): number {
    if (exception instanceof HttpException) {
      return exception.getStatus();
    } else {
      return (
        (exception as myError)?.status ??
        (exception as myError)?.statusCode ??
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  getErrorMessage(exception: unknown): string {
    if (exception instanceof HttpException) {
      return exception.message;
    } else {
      return (
        (exception as any)?.response?.message ??
        (exception as myError)?.message ??
        `${exception}`
      );
    }
  }

  registerCatchAllExceptionsHook() {
    process.on('unhandledRejection', (reason) => {
      console.error('unhandledRejection: ', reason);
    });

    process.on('uncaughtException', (err) => {
      console.error('uncaughtException: ', err);
    });
  }
}
