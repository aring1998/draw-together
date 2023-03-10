import { Controller, Get, Query, ValidationPipe } from '@nestjs/common'
import { getPayload } from 'src/common/utils'
import { BasePageDTO, BasePageResDTO } from 'src/common/utils/base.dto'
import { suc } from 'src/common/utils/response'
import { DiligentUserDTO } from './classes/draw-record'
import { DrawRecordService } from './draw-record.service'

@Controller('drawRecord')
export class DrawRecordController {
  constructor(private readonly drawRecordService: DrawRecordService) {}
  @Get('findDiligentUser')
  async findDiligentUser(@Query(ValidationPipe) query: BasePageDTO): Promise<BasePageResDTO<DiligentUserDTO[]>> {
    const payload = getPayload(query, ['page', 'pageSize'])
    const data = await this.drawRecordService.findDiligentUser(payload)
    return suc(data, '')
  }
}
