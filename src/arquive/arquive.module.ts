import { Module } from '@nestjs/common';
import { ArquiveService } from './arquive.service';
import { ArquiveController } from './arquive.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitConfigService } from 'src/queue/rabbitmq.config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: RabbitConfigService,
    }),
  ],
  controllers: [ArquiveController],
  providers: [ArquiveService],
})
export class ArquiveModule {}
