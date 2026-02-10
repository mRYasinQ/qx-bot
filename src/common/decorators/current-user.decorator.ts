import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { Context } from 'telegraf';

const CurrentUser = createParamDecorator((data: never, context: ExecutionContext) => {
  const ctx = TelegrafExecutionContext.create(context);
  const telegramCtx = ctx.getContext<Context>();

  const currentUser = telegramCtx.user;

  return currentUser;
});

export default CurrentUser;
