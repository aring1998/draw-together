import { Controller } from '@nestjs/common'
import { DrawRecordService } from './draw-record.service'

@Controller('drawRecord')
export class DrawRecordController {
  constructor(private readonly drawRecordService: DrawRecordService) {}
}
