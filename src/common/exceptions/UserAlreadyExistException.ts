import { ConflictException } from '@nestjs/common';

export class UserAlreadyExistException extends ConflictException {
  constructor() {
    super('Email is already used');
  }
}
