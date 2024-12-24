/*
 * @Description: 应用程序的入口文件，它使用核心函数 NestFactory 来创建 Nest 应用程序的实例。
 */
import type { ConfigKeyPaths } from './config';
import cluster from 'node:cluster';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // swagger 接口文档
import { ConfigService } from '@nestjs/config';

import path, { join } from 'node:path';

import { HttpReqTransformInterceptor } from '@/interceptor/http-req.interceptor'; // 全局响应拦截器

import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { requestMiddleware } from '@/middleware/request.middleware'; // 全局请求拦截中间件
import { ValidationPipe } from '@/pipe/validation.pipe'; // 参数校验
import { Logger } from '@/utils/log4js';
import type { Response } from '@/utils/types';

import { isDev, isMainProcess } from './global/env';
import { AppModule } from './app.module';
import { fastifyApp } from './common/adapters/fastify.adapter';
import { RedisIoAdapter } from './common/adapters/socket.adapter';
import App_configuration from './config/configuration'; // 全局配置
import { AllExceptionsFilter } from './filter/any-exception.filter'; // http 异常过滤器
import { TransformInterceptor } from './interceptor/transform.interceptor'; // 全局拦截器，用来收集日志
import { logger } from './middleware/logger.middleware'; // 日志收集中间件
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { setupSwagger } from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyApp,
    {
      bufferLogs: true,
      snapshot: true,
      // forceCloseConnections: true,
    },
  );

  const configService = app.get(ConfigService<ConfigKeyPaths>);

  const { port, globalPrefix } = configService.get('app', { infer: true });

  //日志相关
  app.use(logger); // 所有请求都打印日志

  // 启动cors跨域
  app.enableCors({ origin: '*', credentials: true });
  app.setGlobalPrefix(globalPrefix);
  // 配置文件访问  文件夹为静态目录，以达到可直接访问下面文件的目的
  app.useStaticAssets({
    root: join(__dirname, '..', 'upload'),
    prefix: '/static/', // 这里是前缀
  });

  // 如果当前环境不是开发环境，则启用关闭钩子
  !isDev && app.enableShutdownHooks();

  if (isDev) {
    app.useGlobalInterceptors(new LoggingInterceptor());
  }

  // 全局参数校验
  app.useGlobalPipes(new ValidationPipe());

  // websocket 适配器，使用 redis 适配器
  app.useWebSocketAdapter(new RedisIoAdapter(app));

  // 全局请求拦截中间件
  // app.use(requestMiddleware);

  // 错误异常捕获 和 过滤处理
  app.useGlobalFilters(new AllExceptionsFilter()); // 全局统一异常返回体

  // 全局响应拦截器，格式化返回体
  app.useGlobalInterceptors(new HttpReqTransformInterceptor<Response>());
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局拦截器，用来收集日志

  setupSwagger(app, configService);

  // 全局添加接口前缀
  // app.setGlobalPrefix(process.env.REQUEST_URL_PREFIX);
}
bootstrap();
