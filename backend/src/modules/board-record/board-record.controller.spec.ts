import { Test, TestingModule } from '@nestjs/testing'
import { BoardRecordController } from './board-record.controller'

describe('BoardRecordController', () => {
  let controller: BoardRecordController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoardRecordController]
    }).compile()

    controller = module.get<BoardRecordController>(BoardRecordController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
