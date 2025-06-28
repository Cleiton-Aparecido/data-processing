import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../../users/service/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { validatePassword } from "src/utils/validate-password";
import { AuthDto } from "../dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(auth): Promise<any> {
    const { username, password } = auth;
    const user = await this.usersService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(auth: AuthDto) {
    try {
      const user = await this.validateUser(auth);
      if (!user) {
        throw new UnauthorizedException("Usuário ou senha inválidos");
      }

      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: "10m" }),
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async register(auth: AuthDto): Promise<any> {
    const { username, password } = auth;
    try {
      const userExists = await this.usersService.findByUsername(username);
      if (userExists) {
        throw new UnauthorizedException("Usuário ja cadastrado");
      }

      if (!validatePassword(password)) {
        throw new UnauthorizedException("Senha inválida");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.usersService.create({
        username,
        password: hashedPassword,
      });
      const { password: _, ...result } = user;
      return result;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
