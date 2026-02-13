import type { PipeTransform } from '@nestjs/common';

import type { ZodType } from 'zod';

import AppError from '../exceptions/app.exception';

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);
    if (!result.success) throw new AppError('bot.invalid_params');

    return result.data;
  }
}

export default ZodValidationPipe;
