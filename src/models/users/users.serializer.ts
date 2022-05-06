import { Expose } from 'class-transformer';
import { UsersInterface } from './users.interface';
import { ModelSerializer } from '../model.serializer';

export const defaultUserGroupsForSerializing: string[] = ['user.timestamps'];

export const extendedUserGroupsForSerializing: string[] = [
  ...defaultUserGroupsForSerializing,
];

export const allUserGroupsForSerializing: string[] = [
  ...extendedUserGroupsForSerializing,
  'user.password',
];

export class UsersSerializer extends ModelSerializer implements UsersInterface {
  id: number;

  email: string;

  name: null | string;

  @Expose({ groups: ['user.password'] })
  password: string;

  @Expose({ groups: ['user.timestamps'] })
  createdAt: Date;

  @Expose({ groups: ['user.timestamps'] })
  updatedAt: Date;
}
