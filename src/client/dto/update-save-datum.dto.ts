import { PartialType } from '@nestjs/mapped-types';
import { CreateSaveDatumDto } from './create-save-datum.dto';

export class UpdateSaveDatumDto extends PartialType(CreateSaveDatumDto) {
  id: number;
}
