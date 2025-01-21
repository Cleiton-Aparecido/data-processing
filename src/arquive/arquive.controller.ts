import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArquiveService } from './arquive.service';

@Controller('arquive')
export class ArquiveController {
  constructor(private readonly arquiveService: ArquiveService) {}

  @Post('import-data-client')
  @UseInterceptors(FileInterceptor('file'))
  async importData(@UploadedFile() file: Express.Multer.File) {
    return await this.arquiveService.manipulationArquive(file);
  }

  // Post('/ccb/:ccb_type/:socket_id')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: pathFile.ASSIGNMENT,
  //       filename: (_, file, cb) => {
  //         cb(null, file.originalname);
  //       },
  //     }),
  //   }),
  // )
  // @ApiConsumes('multipart/form-data/')
  // @ApiBody({
  //   type: FileReceiveDto,
  // })
  // async readFromTo(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Param('ccb_type') ccbType: CcbType,
  //   @Param('socket_id') socketId: string,
  //   @User() user: LoggedUser,
  // ): Promise<{ message: string }> {
  //   return await this.importAssignmentService.execute({
  //     file: file.path,
  //     ccbType,
  //     socketId,
  //     userId: user.id,
  //   });
  // }
}
