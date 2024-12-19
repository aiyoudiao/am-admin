/*
 * @Description: Organization Controller
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'; // swagger 接口文档

import { DeleteResponseDto, UpdateResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import { LoggerInterceptor } from '@/interceptor/logger.interceptor';
import type { SessionTypes } from '@/utils/types';

import {
  CreateOrganizationDto,
  ListOrganizationDto,
  ResponseOrganizationDto,
  SaveOrganizationDto,
} from './dto';
import { OrganizationService } from './organization.service'; // Organization Service

/* swagger 文档 */
@ApiTags('智能行政-组织管理')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('administrative/organization')
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  /**
   * @description: 获取组织管理列表
   */
  @Get()
  @ApiOkResponse({ type: ResponseOrganizationDto })
  @ApiOperation({ summary: '获取组织管理列表' })
  async getOrganizationList(@Query() organizationInfo: ListOrganizationDto) {
    const response = await this.organizationService.getOrganizationList(
      organizationInfo,
    );
    return response;
  }

  /**
   * @description: 创建组织数据
   */
  @Post()
  @ApiOkResponse({ type: CreateOrganizationDto })
  @ApiOperation({ summary: '创建组织数据' })
  async createOrganization(
    @Body() organizationInfo: SaveOrganizationDto,
    @Session() session: SessionTypes,
  ) {
    const response = await this.organizationService.createOrganization(
      organizationInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新组织数据
   */
  @Put('/:org_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新组织数据' })
  async updateOrganization(
    @Param('org_id') org_id: string,
    @Body() organizationInfo: SaveOrganizationDto,
  ) {
    const response = await this.organizationService.updateOrganization(
      org_id,
      organizationInfo,
    );
    return response;
  }

  /**
   * @description: 删除组织数据
   */
  @Delete('/:org_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除组织数据' })
  async deleteOrganization(@Param('org_id') org_id: string) {
    const response = await this.organizationService.deleteOrganization(org_id);
    return response;
  }
}
