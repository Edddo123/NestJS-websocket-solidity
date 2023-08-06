import { Injectable } from '@nestjs/common';
import ContractABI from './abi.json';
import { EventsService } from 'src/events/events.service';
import { ContractConnectorServiceFactory } from './contract-connector/contract-connector.factory.service';

@Injectable()
export class SmartContractsService {
  private ContractAddress = process.env.ContractAddress;
  private PersonalAddress = process.env.PersonalAddress;
  private PrivateKey = process.env.PrivateKey;

  constructor(
    private readonly eventsService: EventsService,
    private readonly ContractConnectorServiceFactory: ContractConnectorServiceFactory,
  ) {}

  onModuleInit() {
    this.listenToDataChangedEvents();
  }

  private listenToDataChangedEvents() {
    const contractWs = this.ContractConnectorServiceFactory.getWSContract(
      ContractABI,
      this.ContractAddress,
    );

    contractWs.events
      .DataChanged({
        fromBlock: 'latest',
        filter: {
          _to: this.ContractAddress,
        },
      })
      .on('data', async (event) => {
        this.eventsService.notifyClients('transactionAdded', { data: event });
      });
  }

  async getLatestValue(): Promise<{ data: any }> {
    // Instead of hardcoding ABI, contract address, it can be loaded for different environments/users specifically
    const contract = this.ContractConnectorServiceFactory.getHttpContract(
      ContractABI,
      this.ContractAddress,
    );

    const value = await contract.methods.get().call();

    return { data: Number(value) };
  }

  async updateValue(valueDTO: any): Promise<{ data: any }> {
    const web3Http = this.ContractConnectorServiceFactory.getHttpClient();
    const contract = this.ContractConnectorServiceFactory.getHttpContract(
      ContractABI,
      this.ContractAddress,
    );
    const txData = contract.methods.set(valueDTO.value).encodeABI();

    const txDetails: any = {
      from: this.PersonalAddress,
      to: contract.options.address,
      data: txData,
    };

    const gasPrice = await web3Http.eth.getGasPrice();
    const gasEstimate = await web3Http.eth.estimateGas(txDetails);

    txDetails.gas = gasEstimate;
    txDetails.gasPrice = gasPrice;

    const signedTx = await web3Http.eth.accounts.signTransaction(
      txDetails,
      this.PrivateKey,
    );

    const transactionEvents = await web3Http.eth.sendSignedTransaction(
      signedTx.rawTransaction,
    );

    // if we limited smart contract to initiate transactions from our API only, this would guarantee that we would not miss any updates on the block
    // this.eventsService.notifyClients('transactionAdded', transactionEvents);

    return { data: valueDTO.value };
  }
}
