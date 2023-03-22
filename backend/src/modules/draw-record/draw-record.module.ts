import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DrawRecord } from './draw-record.entity'
import { DrawRecordController } from './draw-record.controller'
import { DrawRecordService } from './draw-record.service'
import { UserModule } from '../user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([DrawRecord]), UserModule],
  controllers: [DrawRecordController],
  providers: [DrawRecordService],
  exports: [DrawRecordService]
})
export class DrawRecordModule {}
