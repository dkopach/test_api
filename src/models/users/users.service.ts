import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UsersSerializer } from './users.serializer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async get(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<UsersSerializer | null> {
    return await this.usersRepository.get(id, relations, throwsException);
  }

  async getByEmail(
    email: string,
    relations: string[] = [],
  ): Promise<UsersSerializer | null> {
    return await this.usersRepository.getByEmail(email, relations);
  }

  async getUserForLogin(email: string): Promise<UsersSerializer | null> {
    return await this.usersRepository.getUserForLogin(email);
  }

  async delete(id: number): Promise<UsersSerializer | null> {
    return await this.usersRepository.deleteModel(id);
  }

  async create(inputs: CreateUserDto): Promise<UsersSerializer> {
    return await this.usersRepository.register(inputs);
  }

  async update(id: number, inputs: EditUserDto): Promise<UsersSerializer> {
    return await this.usersRepository.updateEntity(id, inputs);
  }

  async list(): Promise<UsersSerializer[] | null> {
    return await this.usersRepository.list();
  }

  async listWithOutId(explodeId: number): Promise<UsersSerializer[] | null> {
    return await this.usersRepository.listWithoutId(explodeId);
  }
}
