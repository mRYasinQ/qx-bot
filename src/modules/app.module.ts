import { Module, type OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TelegrafModule } from 'nestjs-telegraf';

import AppConfig from '@/configs/app.config';
import DbConfig from '@/configs/db.config';
import EmitterConfig from '@/configs/emitter.config';
import TgConfig from '@/configs/tg.config';

import CommonModule from '@/common/common.module';
import TelegrafExceptionFilter from '@/common/filters/telegraf-exception.filter';
import AuthGuard from '@/common/guards/auth.guard';
import type { EnvConfig } from '@/common/schemas/env.schema';

import AdminModule from './admin/admin.module';
import BotModule from './bot/bot.module';
import NotificationModule from './notification/notification.module';
import UserModule from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [AppConfig] }),
    EventEmitterModule.forRoot(EmitterConfig),
    MikroOrmModule.forRootAsync(DbConfig),
    TelegrafModule.forRootAsync(TgConfig),
    CommonModule,
    NotificationModule,
    UserModule,
    BotModule,
    AdminModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: TelegrafExceptionFilter },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
class AppModule implements OnModuleInit {
  constructor(
    private readonly orm: MikroORM,
    private readonly config: ConfigService,
  ) {}

  async onModuleInit() {
    const nodeEnv = this.config.get<EnvConfig['NODE_ENV']>('node_env');

    if (nodeEnv === 'production') {
      await this.orm.migrator.up();
    } else {
      await this.orm.schema.updateSchema();
    }
  }
}

export default AppModule;
