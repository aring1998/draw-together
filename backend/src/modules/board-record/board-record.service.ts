import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { BoardRecord } from './board-record.entity'
import { BaseSevice } from 'src/common/utils/base.service'
import { BoardRecordDTO } from './classes/board-record'
import { User } from '../user/user.entity'
import { BasePageDataDTO, BasePageDTO } from 'src/common/utils/base.dto'

@Injectable()
export class BoardRecordService extends BaseSevice<BoardRecord> {
  constructor(
    @InjectRepository(BoardRecord)
    private readonly boardRecordRepository: Repository<BoardRecord>
  ) {
    super(boardRecordRepository)
  }
  async findByPage(option: BasePageDTO & FindOptionsWhere<Partial<BoardRecord>>): Promise<BasePageDataDTO<BoardRecordDTO[]>> {
    const { page, pageSize, ...where } = option
    const sql = this.boardRecordRepository
      .createQueryBuilder('boardRecord')
      .leftJoin(User, 'user', 'boardRecord.lastEditorUid = user.uid')
      .orderBy('boardRecord.created', 'DESC')
      .where({ ...where })
    const records = await sql
      .select(['boardRecord.*', 'user.username AS username'])
      .offset((page - 1) * pageSize)
      .limit(pageSize)
      .getRawMany()
    const total = await sql.getCount()
    return {
      records,
      total,
      page,
      pageSize
    }
  }
}
