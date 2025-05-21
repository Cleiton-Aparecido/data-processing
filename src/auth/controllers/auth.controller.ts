import { Controller, Post, Body, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { AuthDto } from "../dto/auth.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  async register(@Body() auth: AuthDto) {
    return this.authService.register(auth);
  }

  @Post("login")
  async login(@Body() auth: AuthDto) {
    return this.authService.login(auth);
  }
}
