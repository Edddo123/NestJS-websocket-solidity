import { Injectable } from '@nestjs/common';
import { EventsGateway } from './events.gateway';

@Injectable()
export class EventsService {
  constructor(private eventsGateway: EventsGateway) {}

  notifyClients(event: string, data: any) {
    this.eventsGateway.emitEvent(event, data);
  }
}
