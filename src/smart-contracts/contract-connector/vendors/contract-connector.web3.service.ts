import { Injectable } from '@nestjs/common';
import { Web3 } from 'web3';

@Injectable()
export class ContractConnectorWeb3Service implements ContractConnector {
  private INFURA_URL_HTTP = process.env.INFURA_URL_HTTP;
  private _web3Http: any;
  private _web3Ws: any;
  private INFURA_URL_WS = process.env.INFURA_URL_WS;

  getHttpClient() {
    if (!this._web3Http)
      this._web3Http = new Web3(
        new Web3.providers.HttpProvider(this.INFURA_URL_HTTP),
      );
    return { data: this._web3Http };
  }
  getWSClient() {
    if (!this._web3Ws)
      this._web3Ws = new Web3(
        new Web3.providers.WebsocketProvider(this.INFURA_URL_WS),
      );
    return { data: this._web3Ws };
  }

  getHttpContract(ABI: any, contractAddress: string) {
    const { data: httpClient } = this.getHttpClient();
    const contract = new httpClient.eth.Contract(ABI, contractAddress);
    return { data: contract };
  }

  getWSContract(ABI: any, contractAddress: string) {
    const { data: wsClient } = this.getWSClient();
    const contract = new wsClient.eth.Contract(ABI, contractAddress);
    return { data: contract };
  }
}
