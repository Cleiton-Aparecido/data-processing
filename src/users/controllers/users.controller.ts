// src/users/users.controller.ts
import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "../service/users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() body: { username: string; password: string }) {
    // return this.usersService.create(body);
  }
}
