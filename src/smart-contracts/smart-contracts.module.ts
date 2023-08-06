import { Module } from '@nestjs/common';
import { SmartContractsService } from './smart-contracts.service';
import { SmartContractsController } from './smart-contracts.controller';
import { EventsModule } from 'src/events/events.module';
import { ContractConnectorServiceFactory } from './contract-connector/contract-connector.factory.service';
import { ContractConnectorWeb3Service } from './contract-connector/vendors/contract-connector.web3.service';

@Module({
  imports: [EventsModule],
  providers: [
    SmartContractsService,
    ContractConnectorServiceFactory,
    ContractConnectorWeb3Service,
  ],
  controllers: [SmartContractsController],
})
export class SmartContractsModule {}
