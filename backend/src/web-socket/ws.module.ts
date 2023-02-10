import { Module } from '@nestjs/common'
import { DrawRecordModule } from 'src/modules/draw-record/draw-record.module'
import { EventsGateway } from './ws.gateway'

@Module({
  imports: [DrawRecordModule],
  providers: [EventsGateway]
})
export class EventsModule {}
