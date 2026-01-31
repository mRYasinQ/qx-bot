import { ConfigService } from '@nestjs/config';

import { BetterSqliteDriver } from '@mikro-orm/better-sqlite';
import type { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';

import type { EnvConfig } from '@/common/schemas/env.schema';

const DbConfig: MikroOrmModuleAsyncOptions = {
  inject: [ConfigService],
  driver: BetterSqliteDriver,
  useFactory: (config: ConfigService) => ({
    driver: BetterSqliteDriver,
    debug: config.get<EnvConfig['NODE_ENV']>('node_env') === 'development',
    dbName: config.get<EnvConfig['DB_NAME']>('db.name'),
    entities: ['./dist/**/**/*.entity.js'],
    entitiesTs: ['./src/**/**/*.entity.ts'],
    allowGlobalContext: config.get<EnvConfig['NODE_ENV']>('node_env') === 'development',
  }),
};

export default DbConfig;
