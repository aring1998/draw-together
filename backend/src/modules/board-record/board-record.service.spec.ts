import { Test, TestingModule } from '@nestjs/testing'
import { BoardRecordService } from './board-record.service'

describe('OrderService', () => {
  let service: BoardRecordService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardRecordService]
    }).compile()

    service = module.get<BoardRecordService>(BoardRecordService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
