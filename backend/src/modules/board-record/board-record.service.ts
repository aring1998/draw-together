import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { BoardRecord } from './board-record.entity'
import { BaseSevice } from 'src/common/utils/base.service'
import { BoardRecordDTO } from './classes/board-record'
import { User } from '../user/user.entity'
import { BasePageDataDTO } from 'src/common/utils/base.dto'

@Injectable()
export class BoardRecordService extends BaseSevice<BoardRecord> {
  constructor(
    @InjectRepository(BoardRecord)
    private readonly boardRecordRepository: Repository<BoardRecord>
  ) {
    super(boardRecordRepository)
  }
  async findByPage(option: { page: number; pageSize: number; [propName: string]: any }): Promise<BasePageDataDTO<BoardRecordDTO[]>> {
    const { page = 1, pageSize = 200, ...where } = option
    const sql = this.boardRecordRepository
      .createQueryBuilder('boardRecord')
      .leftJoin(User, 'user', 'boardRecord.lastEditorUid = user.uid')
      .where({ ...where })
    const records = await sql
      .select(
        `
        boardRecord.*,
        user.username AS username
      `
      )
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getRawMany()
    const total = await sql.getCount()
    return {
      records,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    }
  }
}
