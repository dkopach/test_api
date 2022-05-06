import { plainToInstance } from 'class-transformer';
import { Repository, DeepPartial } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ModelSerializer } from './model.serializer';

export class ModelRepository<
  T,
  K extends ModelSerializer,
> extends Repository<T> {
  async get(
    id: number,
    relations: string[] = [],
    throwsException = false,
  ): Promise<K | null> {
    return await this.findOne({
      where: { id },
      relations,
    })
      .then((entity) => {
        if (!entity && throwsException) {
          return Promise.reject(new NotFoundException('Model not found.'));
        }

        return Promise.resolve(entity ? this.transform(entity) : null);
      })
      .catch((error) => Promise.reject(error));
  }

  async deleteModel(id: number): Promise<null> {
    return await this.delete(id)
      .then(() => {
        return Promise.resolve(null);
      })
      .catch((error) => Promise.reject(error));
  }

  async list(relations: string[] = []): Promise<K[] | []> {
    return await this.find({
      relations,
    })
      .then((entities) => {
        return Promise.resolve(
          entities?.length ? this.transformMany(entities) : [],
        );
      })
      .catch((error) => Promise.reject(error));
  }

  async createEntity(
    inputs: DeepPartial<T>,
    relations: string[] = [],
  ): Promise<K> {
    return this.save(inputs)
      .then(async (entity) => await this.get((entity as any).id, relations))
      .catch((error) => Promise.reject(error));
  }

  async updateEntity(
    id: number,
    inputs: QueryDeepPartialEntity<T>,
    relations: string[] = [],
  ): Promise<K> {
    return this.update(id, inputs)
      .then(async () => await this.get(id, relations))
      .catch((error) => Promise.reject(error));
  }

  transform(model: T, transformOptions = {}): K {
    return plainToInstance(ModelSerializer, model, transformOptions) as K;
  }

  transformMany(models: T[], transformOptions = {}): K[] {
    return models.map((model) => this.transform(model, transformOptions));
  }
}
