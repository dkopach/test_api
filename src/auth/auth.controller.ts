import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { CreateUserDto } from '../models/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() req: LoginDto, @User() user) {
    return this.authService.getTokenResponse({ sub: user.id, name: user.name });
  }

  @Post('register')
  async register(@Body() req: CreateUserDto) {
    return this.authService.register(req);
  }
}
