import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class AuthDto {
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
