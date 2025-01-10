import { Module } from '@nestjs/common';
import { TableStoreService } from './table-store.service';
import { TableStoreController } from './table-store.controller';

@Module({
  controllers: [TableStoreController],
  providers: [TableStoreService],
})
export class TableStoreModule {}
