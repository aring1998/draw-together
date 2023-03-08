import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BoardRecord } from './board-record.entity'
import { BoardRecordController } from './board-record.controller'
import { BoardRecordService } from './board-record.service'

@Module({
  imports: [TypeOrmModule.forFeature([BoardRecord])],
  controllers: [BoardRecordController],
  providers: [BoardRecordService],
  exports: [BoardRecordService]
})
export class BoardRecordModule {}
