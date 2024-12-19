/*
 * @Description: Common Controller
 */
import { Body, Controller, Post } from '@nestjs/common';

import { CommonService } from './common.service';

@Controller('/common')
export class CommonController {
  constructor(private readonly commonService: CommonService) { }

  /**
   * @description: 获取掘金文章列表
   */
  @Post('/juejin')
  async juejin(@Body() params) {
    const response = await this.commonService.juejin(params);
    return response;
  }
}
