import { HttpException, Logger, UnauthorizedException } from "@nestjs/common";
import { ExceptionsHandler } from "@nestjs/core/exceptions/exceptions-handler";
import { promises as fs } from "fs";

export async function deleteFile(path: string): Promise<void> {
  try {
    await fs.unlink(path);
    Logger.warn(`Arquivo deletado: ${path}`);
  } catch (error) {
    Logger.error(`Erro ao deletar arquivo: ${path} `, error);
    throw error;
  }
}
