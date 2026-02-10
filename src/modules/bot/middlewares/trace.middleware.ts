import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Context, type Middleware } from 'telegraf';

import type { EnvConfig } from '@/common/schemas/env.schema';

@Injectable()
class TraceMiddleware {
  constructor(private readonly config: ConfigService) {}

  use: Middleware<Context> = (ctx, next) => {
    const nodeEnv = this.config.get<EnvConfig['NODE_ENV']>('node_env');

    if (nodeEnv === 'development') {
      const update = ctx.update;
      console.log(JSON.stringify(update, null, 4));
    }

    return next();
  };
}

export default TraceMiddleware;
