import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
// import { ExchangeName, RoutingKey } from 'src/shared/enums';

@Injectable()
export class RabbitmqSetupService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  //   async publish<T = any>(
  //     exchange: ExchangeName,
  //     routingKey: RoutingKey,
  //     payload: T,
  //   ): Promise<boolean> {
  //     return this.amqpConnection.publish(exchange, routingKey, payload);
  //   }
}
