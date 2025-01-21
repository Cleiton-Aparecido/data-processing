// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { join } from 'path';
// import { clientEntity } from 'src/client/entity/client.entity';

// @Injectable()
// export class DataBaseConnectionService implements TypeOrmOptionsFactory {
//   constructor(private configService: ConfigService) {}

//   createTypeOrmOptions(): TypeOrmModuleOptions {
//     return {
//       name: 'default',
//       type: 'mysql',
//       host: this.configService.get<string>('DB_HOST'),
//       port: Number(this.configService.get<number>('DB_PORT')),
//       username: this.configService.get<string>('DB_USERNAME'),
//       password: this.configService.get<string>('DB_PASSWORD'),
//       database: this.configService.get<string>('DB_DATABASE'),
//       // Usando join para lidar com caminhos corretamente
//       entities: [clientEntity], // Entidades (para dev usa-se ts)
//       migrations: [join(__dirname, '/../migrations/*.{ts,js}')], // Migrações (para dev usa-se ts)
//       synchronize: false, // Desativado para evitar a sincronização automática no dev
//       migrationsRun: true, // Executar migrações automaticamente
//       keepConnectionAlive: true,
//       logging: true, // Habilita logs para facilitar a depuração
//     };
//   }
// }
