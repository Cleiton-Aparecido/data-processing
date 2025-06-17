import { Controller, Post, Body, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthDto } from "../dto/auth.dto";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @ApiOperation({ summary: "Registrar um novo usuário" })
  @ApiBody({
    description: "Registrar um novo usuário",
    type: AuthDto,
    examples: {
      exemplo: {
        summary: "Exemplo para registro",
        value: {
          username: "test",
          password: "MeuP@ssw0rd",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Retorno registrar um novo usuário",
    example: {
      username: "test",
      id: 1,
      isActive: true,
    },
  })
  @ApiResponse({
    status: 401,
    description: "Retorno registrar um novo usuário",
    example: {
      message: "Usuário ja cadastrado",
      error: "Unauthorized",
      statusCode: 401,
    },
  })
  async register(@Body() auth: AuthDto) {
    return this.authService.register(auth);
  }

  @Post("login")
  @ApiOperation({ summary: "Realizar login" })
  @ApiBody({
    description: "login de usuário",
    type: AuthDto,
    examples: {
      exemplo: {
        summary: "Exemplo para login",
        value: {
          username: "test",
          password: "MeuP@ssw0rd",
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: "Realizar autenticação",
    example: {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImNsZWl0b24iLCJzdWIiOjEsImlhdCI6MTc1MDExOTgyMCwiZXhwIjoxNzUwMTIwNDIwfQ.cVxSf5uH1wvXSGzaQYIorj7hDmFBe88tu2HtRQvW9SE",
    },
  })
  @ApiResponse({
    status: 401,
    description: "Realizar autenticação",
    example: {
      message: "Usuário ou senha inválidos",
      error: "Unauthorized",
      statusCode: 401,
    },
  })
  async login(@Body() auth: AuthDto) {
    return this.authService.login(auth);
  }
}
