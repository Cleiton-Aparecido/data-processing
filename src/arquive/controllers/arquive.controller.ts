import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ArquiveService } from "../services/arquive.service";
import { diskStorage } from "multer";
import { extname } from "path";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
@UseGuards(JwtAuthGuard)
@Controller("arquive")
export class ArquiveController {
  constructor(private readonly arquiveService: ArquiveService) {}

  @Post("import-data-client")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./temp/uploads",
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
          callback(null, filename);
        },
      }),
    })
  )
  async importData(
    @UploadedFile() file: Express.Multer.File
  ): Promise<{ message: string }> {
    return await this.arquiveService.manipulationArquive(file.path);
  }
}
