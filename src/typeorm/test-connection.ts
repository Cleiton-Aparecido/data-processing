import { AppDataSource } from './data-source';

async function testConnection() {
  try {
    await AppDataSource.initialize();
    console.log('Conexão com o banco de dados foi bem-sucedida!');
    await AppDataSource.destroy(); // Fecha a conexão após o teste
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

testConnection();
