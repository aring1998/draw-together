import { Module } from '@nestjs/common'
import { BoardRecordModule } from 'src/modules/board-record/board-record.module'
import { DrawRecordModule } from 'src/modules/draw-record/draw-record.module'
import { EventsGateway } from './ws.gateway'

@Module({
  imports: [DrawRecordModule, BoardRecordModule],
  providers: [EventsGateway]
})
export class EventsModule {}
