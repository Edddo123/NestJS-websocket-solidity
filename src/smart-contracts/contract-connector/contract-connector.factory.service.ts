import { Injectable } from '@nestjs/common';
import { ContractConnectorWeb3Service } from './vendors/contract-connector.web3.service';

@Injectable()
export class ContractConnectorServiceFactory implements ContractConnector {
  constructor(
    private readonly contractConnectorWeb3Service: ContractConnectorWeb3Service,
  ) {}

  // We could build system where we can use different libraries for integration for different ENV/use cases
  getHttpClient(type = 'web3') {
    if (type === 'web3')
      return this.contractConnectorWeb3Service.getHttpClient().data;
  }
  getWSClient(type = 'web3') {
    if (type === 'web3')
      return this.contractConnectorWeb3Service.getWSClient().data;
  }
  getHttpContract(ABI: any, contractAddress: string, type = 'web3') {
    if (type === 'web3')
      return this.contractConnectorWeb3Service.getHttpContract(
        ABI,
        contractAddress,
      ).data;
  }
  getWSContract(ABI: any, contractAddress: string, type = 'web3') {
    if (type === 'web3')
      return this.contractConnectorWeb3Service.getWSContract(
        ABI,
        contractAddress,
      ).data;
  }
}
