import { Controller, Get, Query, UsePipes, ValidationPipe, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/auth.guard'
import { PaginationPipe } from 'src/common/pipes/pagination-pipe'
import { getPayload } from 'src/common/utils'
import { BasePageDTO, BasePageResDTO } from 'src/common/utils/base.dto'
import { suc, fail } from 'src/common/utils/response'
import { saveBoardData } from 'src/web-socket/methods/board-data'
import { getCurrentBoardData } from 'src/web-socket/ws.gateway'
import { DiligentUserDTO } from './classes/draw-record'
import { DrawRecordService } from './draw-record.service'

@Controller('drawRecord')
export class DrawRecordController {
  constructor(private readonly drawRecordService: DrawRecordService) {}
  @Get('findDiligentUser')
  @UsePipes(PaginationPipe)
  async findDiligentUser(@Query(ValidationPipe) query: BasePageDTO): Promise<BasePageResDTO<DiligentUserDTO[]>> {
    const payload = getPayload(query, ['page', 'pageSize'])
    const data = await this.drawRecordService.findDiligentUser(payload)
    return suc(data, '')
  }

  @Post('saveBoardDataByHand')
  @UseGuards(AuthGuard)
  async saveBoardDataByHand(): Promise<{}> {
    const boardData = getCurrentBoardData()
    const err = saveBoardData(boardData)
    if (err) return fail(`备份失败，Error: ${err.message}`)
    return suc({}, '备份成功')
  }
}
