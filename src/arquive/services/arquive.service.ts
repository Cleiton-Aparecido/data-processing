import { HttpException, Injectable } from "@nestjs/common";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";

@Injectable()
export class ArquiveService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async manipulationArquive(path: string): Promise<{ message: string }> {
    if (!path) {
      throw new HttpException(
        { status: 403, error: "Nenhum arquivo importado" },
        403
      );
    }

    this.amqpConnection.publish(
      "process-arquive",
      "key.save-data-routing-key-client",
      path
    );
    return { message: "Arquivo Importado com sucesso" };
  }
}
