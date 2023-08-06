import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SmartContractsModule } from './smart-contracts/smart-contracts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventsModule,
    SmartContractsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
