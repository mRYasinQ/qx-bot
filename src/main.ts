import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import type { EnvConfig } from './common/schemas/env.schema';

import AppModule from './modules/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = config.getOrThrow<EnvConfig['APP_PORT']>('app.port');

  await app.listen(port);
}

void bootstrap();
