import { Controller, Get, Post, Body } from '@nestjs/common';
import { SmartContractsService } from './smart-contracts.service';

@Controller('smart-contracts')
export class SmartContractsController {
  constructor(private readonly smartContractsService: SmartContractsService) {}

  @Get('/value')
  async getLatestValue(): Promise<any> {
    return this.smartContractsService.getLatestValue();
  }

  @Post('/value')
  async updateValue(@Body() valueDTO: any): Promise<any> {
    return this.smartContractsService.updateValue(valueDTO);
  }
}
