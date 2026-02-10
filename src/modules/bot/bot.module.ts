import { Module } from '@nestjs/common';

import UserModule from '../user/user.module';
import BotUpdate from './bot.update';
import TraceMiddleware from './middlewares/trace.middleware';

@Module({
  imports: [UserModule],
  providers: [TraceMiddleware, BotUpdate],
  exports: [TraceMiddleware],
})
class BotModule {}

export default BotModule;
