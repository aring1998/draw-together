import { Test, TestingModule } from '@nestjs/testing';
import { DrawRecordService } from './draw-record.service'

describe('DrawRecordService', () => {
  let service: DrawRecordService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrawRecordService]
    }).compile()

    service = module.get<DrawRecordService>(DrawRecordService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
