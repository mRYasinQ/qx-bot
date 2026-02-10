import { Injectable } from '@nestjs/common';

import type { EntityData, FindOneOptions, RequiredEntityData } from '@mikro-orm/better-sqlite';
import { EntityManager, EntityRepository } from '@mikro-orm/better-sqlite';
import { InjectRepository } from '@mikro-orm/nestjs';

import type { FindAllOptions, PaginatedResult } from '@/common/interfaces/pagination.interface';
import type User from '@/common/interfaces/user.interface';
import { formatPaginatedResult, prepareFindAllOptions } from '@/common/utils/pagination.util';

import UserEntity from './user.entity';

@Injectable()
class UserService {
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async findAll(options: FindAllOptions<UserEntity>): Promise<PaginatedResult<UserEntity>> {
    const { where, findOptions } = prepareFindAllOptions(options ?? {});

    const [items, total] = await this.userRepository.findAndCount(where, findOptions);

    return formatPaginatedResult(items, total, options, findOptions);
  }

  findOne(tgId: string, options?: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne({ tgId }, options);
  }

  findOneById(id: number, options?: FindOneOptions<UserEntity>) {
    return this.userRepository.findOne({ id }, options);
  }

  async findOrCreate(data: RequiredEntityData<UserEntity>): Promise<User> {
    const { tgId } = data;

    const user = await this.findOne(tgId);
    if (user) return { ...user, isNewUser: false };

    const newUser = this.userRepository.create(data);
    await this.em.flush();

    return { ...newUser, isNewUser: true };
  }

  async update(id: number, data: EntityData<UserEntity>) {
    const user = await this.userRepository.findOneOrFail({ id });

    this.userRepository.assign(user, data);
    await this.em.flush();

    return user;
  }
}

export default UserService;
