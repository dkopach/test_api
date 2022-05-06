import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAlreadyExistException } from '../common/exceptions/UserAlreadyExistException';
import * as bcrypt from 'bcrypt';
import { JwtPayloadInterface } from './interfaces/jwt-payload.interface';
import { plainToInstance } from 'class-transformer';
import { TokenSerializer } from './serializers/token.serializer';
import { UsersService } from '../models/users/users.service';
import { CreateUserDto } from '../models/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async validateUser(email, password): Promise<any> {
    const user = await this.userService.getUserForLogin(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async register(form: CreateUserDto) {
    if (!!(await this.userService.getByEmail(form.email))) {
      throw new UserAlreadyExistException();
    }
    const user = await this.userService.create(form);
    return this.getTokenResponse({ sub: user.id, name: user.name });
  }

  async getTokenResponse(
    payload: JwtPayloadInterface,
  ): Promise<TokenSerializer> {
    return plainToInstance(TokenSerializer, {
      access_token: this.jwtService.sign(payload),
    });
  }
}
