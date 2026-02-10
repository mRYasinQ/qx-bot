import { ConfigService } from '@nestjs/config';

import type { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { SocksProxyAgent } from 'socks-proxy-agent';

import type { EnvConfig } from '@/common/schemas/env.schema';

import BotModule from '@/modules/bot/bot.module';
import TraceMiddleware from '@/modules/bot/middlewares/trace.middleware';
import AuthMiddleware from '@/modules/user/middlewares/auth.middleware';
import UserModule from '@/modules/user/user.module';

const TgConfig: TelegrafModuleAsyncOptions = {
  imports: [BotModule, UserModule],
  inject: [ConfigService, TraceMiddleware, AuthMiddleware],
  useFactory: (config: ConfigService, traceMiddleare: TraceMiddleware, authMiddleware: AuthMiddleware) => {
    const proxy = config.get<EnvConfig['BOT_PROXY']>('bot.proxy');
    const agent = proxy ? new SocksProxyAgent(proxy) : undefined;

    return {
      token: config.getOrThrow<EnvConfig['BOT_TOKEN']>('bot.token'),
      options: { telegram: { agent } },
      middlewares: [traceMiddleare.use, authMiddleware.use],
    };
  },
};

export default TgConfig;
