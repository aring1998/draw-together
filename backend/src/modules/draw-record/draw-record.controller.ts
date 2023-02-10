import { Body, Controller, Post, ValidationPipe, Headers } from '@nestjs/common'
import { DrawRecordService } from './draw-record.service'

@Controller('user')
export class DrawRecordController {
  constructor(private readonly drawRecordService: DrawRecordService) {}
}
