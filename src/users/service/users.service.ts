import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { userEntity } from "src/typeorm/entities/users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(userEntity)
    private usersRepository: Repository<userEntity>
  ) {}

  async findByUsername(username: string): Promise<userEntity | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async create(user: Partial<userEntity>): Promise<userEntity> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}
