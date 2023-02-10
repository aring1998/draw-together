import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DrawRecord } from './draw-record.entity'
import { BaseSevice } from 'src/common/utils/base.service'

@Injectable()
export class DrawRecordService extends BaseSevice<DrawRecord> {
  constructor(
    @InjectRepository(DrawRecord)
    private readonly drawRecordRepository: Repository<DrawRecord>
  ) {
    super(drawRecordRepository)
  }
  findLastRecordByUid(uid: string) {
    return this.drawRecordRepository.createQueryBuilder().where({ uid }).orderBy('drawTime', 'DESC').getOne()
  }
}
