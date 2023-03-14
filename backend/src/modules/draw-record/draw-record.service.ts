import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DrawRecord } from './draw-record.entity'
import { BaseSevice } from 'src/common/utils/base.service'
import { User } from '../user/user.entity'
import { BasePageDTO } from 'src/common/utils/base.dto'

@Injectable()
export class DrawRecordService extends BaseSevice<DrawRecord> {
  constructor(
    @InjectRepository(DrawRecord)
    private readonly drawRecordRepository: Repository<DrawRecord>
  ) {
    super(drawRecordRepository)
  }
  findLastRecord() {
    return this.drawRecordRepository.createQueryBuilder().orderBy('drawTime', 'DESC').getOne()
  }
  async findDiligentUser(option: BasePageDTO) {
    const { page, pageSize } = option
    const sql = this.drawRecordRepository
      .createQueryBuilder('drawRecord')
      .leftJoin(User, 'user', 'drawRecord.uid = user.uid')
      .groupBy('user.username')
      .having('user.username IS NOT NULL')
      .select(['user.username AS username', 'MAX(drawRecord.created) AS lastEditDate', 'COUNT(user.username) AS count'])
    const records = await sql
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getRawMany()
    const { length: total } = await sql.getRawMany()
    return {
      records,
      total,
      page,
      pageSize
    }
  }
}
