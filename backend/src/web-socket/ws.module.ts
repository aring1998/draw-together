import { Module } from '@nestjs/common'
import { EventsGateway } from './ws.gateway'

@Module({
  providers: [EventsGateway]
})
export class EventsModule {}
