import { EntityRepository, Not } from 'typeorm';
import { ModelRepository } from '../model.repository';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import {
  allUserGroupsForSerializing,
  UsersSerializer,
} from './users.serializer';
import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@EntityRepository(UsersEntity)
export class UsersRepository extends ModelRepository<
  UsersEntity,
  UsersSerializer
> {
  async getByEmail(
    email: string,
    relations: string[] = [],
  ): Promise<UsersSerializer | null> {
    return await this.findOne({
      where: { email },
      relations,
    })
      .then((entity) => {
        return Promise.resolve(entity ? this.transform(entity) : null);
      })
      .catch((error) => Promise.reject(error));
  }

  async getUserForLogin(email: string): Promise<UsersEntity | null> {
    return await this.createQueryBuilder('user')
      .where({ email })
      .addSelect('user.password')
      .getOne();
  }

  transform(model: UsersEntity): UsersSerializer {
    const tranformOptions = {
      groups: allUserGroupsForSerializing,
    };
    return plainToInstance(
      UsersSerializer,
      instanceToPlain(model, tranformOptions),
      tranformOptions,
    );
  }

  transformMany(models: UsersEntity[]): UsersSerializer[] {
    return models.map((model) => this.transform(model));
  }

  async register(inputs: CreateUserDto): Promise<UsersSerializer> {
    return this.save({
      ...inputs,
      password: bcrypt.hashSync(inputs.password, 10),
    })
      .then(async (entity) => await this.get((entity as any).id))
      .catch((error) => Promise.reject(error));
  }

  async listWithoutId(explodeId: number): Promise<UsersSerializer[] | []> {
    return await this.find({
      ...(explodeId ? { where: { id: Not(explodeId) } } : {}),
    })
      .then((entities) => {
        return Promise.resolve(
          entities?.length ? this.transformMany(entities) : [],
        );
      })
      .catch((error) => Promise.reject(error));
  }
}
