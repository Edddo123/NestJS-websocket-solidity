import { Test, TestingModule } from '@nestjs/testing';
import { SmartContractsController } from './smart-contracts.controller';

describe('SmartContractsController', () => {
  let controller: SmartContractsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartContractsController],
    }).compile();

    controller = module.get<SmartContractsController>(SmartContractsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
