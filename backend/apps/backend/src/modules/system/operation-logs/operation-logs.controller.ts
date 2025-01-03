/*
 * @Description: OperationLogs Controller
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger'; // swagger 接口文档

import { DeleteResponseDto } from '@/dto/response.dto'; // 响应体 Dto

import {
  DelLogsDto,
  ListOperationLogsDto,
  ResponseOperationLogsDto,
} from './dto';
import { OperationLogsService } from './operation-logs.service'; // OperationLogs Service

@Controller('system/operation-log')
export class OperationLogsController {
  constructor(private readonly operationLogsService: OperationLogsService) {}
  /**
   * @description: 获取操作日志列表
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseOperationLogsDto })
  @ApiOperation({ summary: '获取操作日志列表' })
  async getLogsList(@Query() logsInfo: ListOperationLogsDto) {
    const response = await this.operationLogsService.getLogsList(logsInfo);
    return response;
  }

  /**
   * @description: 删除操作日志
   */
  @Delete()
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除操作日志' })
  async deleteLogs(@Body() body: DelLogsDto) {
    const response = await this.operationLogsService.deleteLogs(body.ids);
    return response;
  }
}
