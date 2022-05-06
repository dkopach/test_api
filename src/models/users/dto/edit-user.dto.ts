import { IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EditUserDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;
}
