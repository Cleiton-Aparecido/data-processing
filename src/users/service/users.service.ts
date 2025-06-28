import { Injectable, NotFoundException } from "@nestjs/common";
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
    const newUser = await this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }

  async findAll(): Promise<userEntity[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<userEntity> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return user;
  }

  async update(
    id: number,
    updateData: Partial<userEntity>
  ): Promise<userEntity> {
    const user = await this.findOne(id);
    const updated = Object.assign(user, updateData);
    return this.usersRepository.save(updated);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
