interface ContractConnector {
  getHttpClient(): any;
  getWSClient(): any;
  getHttpContract(ABI: any, contractAddress: string): any;
  getWSContract(ABI: any, contractAddress: string): any;
}
