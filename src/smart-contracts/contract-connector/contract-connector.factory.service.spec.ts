import { Test, TestingModule } from '@nestjs/testing';
import { ContractConnectorServiceFactory } from './contract-connector.factory.service';

describe('ContractConnectorService', () => {
  let service: ContractConnectorServiceFactory;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContractConnectorServiceFactory],
    }).compile();

    service = module.get<ContractConnectorServiceFactory>(
      ContractConnectorServiceFactory,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
