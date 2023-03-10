import { Controller, Get, Query, ValidationPipe } from '@nestjs/common'
import { getPayload } from 'src/common/utils'
import { BasePageDTO, BasePageResDTO } from 'src/common/utils/base.dto'
import { suc } from 'src/common/utils/response'
import { BoardRecordService } from './board-record.service'
import { BoardRecordDTO } from './classes/board-record'

@Controller('boardRecord')
export class BoardRecordController {
  constructor(private readonly boardRecordService: BoardRecordService) {}

  @Get('list')
  async mine(@Query(ValidationPipe) query: BasePageDTO): Promise<BasePageResDTO<BoardRecordDTO[]>> {
    const payload = getPayload(query, ['page', 'pageSize'])
    const data = await this.boardRecordService.findByPage(payload)
    return suc(data, '')
  }
}
