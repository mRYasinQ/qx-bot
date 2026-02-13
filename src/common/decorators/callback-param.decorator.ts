import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import type { ZodType } from 'zod';

import AppError from '../exceptions/app.exception';
import ZodValidationPipe from '../pipes/zod-validation.pipe';

const ExtractCallbackData = createParamDecorator((data: never, context: ExecutionContext) => {
  const ctx = TelegrafExecutionContext.create(context);
  const telegramCtx = ctx.getContext<Context>();

  const match = telegramCtx.match;
  if (!match || !match[1]) throw new AppError('bot.param_error');

  return match[1];
});

const CallbackParam = (schema?: ZodType) => (schema ? ExtractCallbackData(new ZodValidationPipe(schema)) : ExtractCallbackData());

export default CallbackParam;
