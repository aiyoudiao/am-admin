/*
 * @Description: 上传文件 Dto
 */
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: String,
    description: '文件流',
    format: 'binary',
  })
  file: any;
}
