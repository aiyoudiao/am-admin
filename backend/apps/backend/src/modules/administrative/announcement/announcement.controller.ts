/*
 * @Description: Announcement Controller
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  Sse,
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
import { EventEmitter } from 'events';
import { get } from 'lodash';
import { Observable } from 'rxjs';

import { DeleteResponseDto, UpdateResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import { LoggerInterceptor } from '@/interceptor/logger.interceptor';
import type { SessionTypes } from '@/utils/types';
import { AnnouncementAttributes } from '@/utils/types/administrative';

import { AnnouncementService } from './announcement.service'; // Announcement Service
import {
  CreateAlreadyDto,
  CreateAnnouncementDto,
  ListAnnouncementDto,
  ResponseAnnouncementDto,
  SaveAnnouncementDto,
  UpdatePinnedDto,
} from './dto';

const eventEmitter = new EventEmitter();

@ApiTags('智能行政-活动公告')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@UseInterceptors(LoggerInterceptor)
@UseGuards(AuthGuard('jwt'))
@Controller('administrative/announcement')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  /**
   * @description: 获取活动公告列表
   */
  @Get()
  @ApiOkResponse({ type: ResponseAnnouncementDto })
  @ApiOperation({ summary: '获取活动公告列表' })
  async getAnnouncementList(
    @Query() announcementInfo: ListAnnouncementDto,
    @Session() session: SessionTypes,
  ) {
    const response = await this.announcementService.getAnnouncementList(
      announcementInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 服务端推送事件
   */
  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return new Observable<any>((observer) => {
      eventEmitter.on('send', (data: AnnouncementAttributes) => {
        observer.next({ data });
      });
    });
  }

  /**
   * @description: 创建活动公告
   */
  @Post()
  @ApiOkResponse({ type: CreateAnnouncementDto })
  @ApiOperation({ summary: '创建活动公告' })
  async saveAnnouncement(
    @Body() announcementInfo: SaveAnnouncementDto,
    @Session() session: SessionTypes,
  ) {
    const response = await this.announcementService.saveAnnouncement(
      announcementInfo,
      session,
    );
    // 发布文章的时候推送消息给客户端
    if (!announcementInfo.announcement_id) {
      eventEmitter.emit('send', {
        ...get(response, 'data.dataValues', {}),
        ...session.currentUserInfo,
      });
    }
    return response;
  }

  /**
   * @description: 删除活动公告
   */
  @Delete('/:announcement_id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除活动公告' })
  async deleteAnnouncement(@Param('announcement_id') announcement_id: string) {
    const response = await this.announcementService.deleteAnnouncement(
      announcement_id,
    );
    eventEmitter.emit('send', {});
    return response;
  }

  /**
   * @description: 更新是否置顶状态
   */
  @Patch('/:announcement_id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新是否置顶状态' })
  async updatePinned(
    @Param('announcement_id') announcement_id: string,
    @Body() { pinned }: UpdatePinnedDto,
  ) {
    const response = await this.announcementService.updatePinned(
      announcement_id,
      pinned,
    );
    return response;
  }

  /**
   * @description: 已读活动公告
   */
  @Post('/already')
  @ApiOkResponse({ type: CreateAlreadyDto })
  @ApiOperation({ summary: '已读活动公告' })
  async createAlready(
    @Body() { announcement_id }: Pick<SaveAnnouncementDto, 'announcement_id'>,
    @Session() session: SessionTypes,
  ) {
    const response = await this.announcementService.createAlready(
      announcement_id,
      session,
    );
    return response;
  }

  /**
   * @description: 查询不同消息类型的未读条数
   */
  @Get('/unready')
  @ApiOkResponse({ type: ResponseAnnouncementDto })
  @ApiOperation({ summary: '查询不同消息类型的未读条数' })
  async queryUnreadyCount(@Session() session: SessionTypes) {
    const response = await this.announcementService.queryUnreadyCount(session);
    return response;
  }
}
