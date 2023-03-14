import { Test, TestingModule } from '@nestjs/testing';
import { DrawRecordController } from './draw-record.controller'

describe('DrawRecordController', () => {
  let controller: DrawRecordController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DrawRecordController]
    }).compile()

    controller = module.get<DrawRecordController>(DrawRecordController)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
