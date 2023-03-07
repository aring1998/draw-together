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
  findLastRecord() {
    return this.drawRecordRepository.createQueryBuilder().orderBy('drawTime', 'DESC').getOne()
  }
  findLastRecordByUid(uid: string) {
    return this.drawRecordRepository.createQueryBuilder().where({ uid }).orderBy('drawTime', 'DESC').getOne()
  }
}
