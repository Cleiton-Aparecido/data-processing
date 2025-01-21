import { HttpException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { promises as fs } from 'fs';
import { promises } from 'dns';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class ArquiveService {
  constructor(private readonly amqpConnection: AmqpConnection) {}
  private async createArquive(file: Express.Multer.File): Promise<String> {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours());
    const minute = String(date.getMinutes());
    const second = String(date.getSeconds());
    const formattedDate = `${year}${month}${day}&${hour}${minute}${second}`;
    const fileName = file.originalname.replace('.csv', '');
    const dirPath = process.env.PATH_ARQUIVE;

    if (!dirPath) {
      throw new HttpException(
        { status: 500, error: 'Caminho de arquivo não definido' },
        500,
      );
    }
    const filePath = path.join(dirPath, `${fileName}${formattedDate}.txt`);
    try {
      await fs.writeFile(filePath, file.buffer.toString());
      console.log('Arquivo Criado');
    } catch (err) {
      console.error('Erro ao criar arquivo:', err);
      throw new HttpException(
        { status: 500, error: 'Erro ao salvar o arquivo' },
        500,
      );
    }
    return filePath;
  }

  async manipulationArquive(file: Express.Multer.File) {
    if (!file) {
      throw new HttpException(
        { status: 403, error: 'Nenhum arquivo importado' },
        403,
      );
    }

    const path = await this.createArquive(file);
    this.amqpConnection.publish(
      'process-arquive',
      'key.save-data-routing-key-client',
      path,
    );
    return { message: 'Arquivo Importado com sucesso', path: path };
  }
}
