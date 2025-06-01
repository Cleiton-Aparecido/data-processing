import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Type } from "class-transformer";

export class DataClientDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @IsNumber({}, { message: "id deve ser um número" })
  id?: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  @Length(11, 11, { message: "CPF deve ter exatamente 11 caracteres" })
  cpf: string;

  @IsString()
  @IsOptional()
  @Length(7, 14, { message: "RG deve ter entre 7 e 14 caracteres" })
  rg: string;

  @IsString()
  @IsOptional()
  father: string;

  @IsString()
  @IsOptional()
  mother: string;

  @IsString()
  @IsOptional()
  telephone: string;

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  createdAt: Date;
}
