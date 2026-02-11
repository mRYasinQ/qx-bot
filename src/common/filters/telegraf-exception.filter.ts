import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';

import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import type { WizardContext } from 'telegraf/scenes';
import type { ReplyKeyboardMarkup } from 'telegraf/types';

import AppError from '../exceptions/app.exception';
import MessagesHelper from '../helpers/messages.helper';
import { mainKeyboard } from '../keyboards/main';

@Catch()
class TelegrafExceptionFilter implements ExceptionFilter {
  constructor(private readonly messagesHelper: MessagesHelper) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const args = TelegrafArgumentsHost.create(host);
    const telegramCtx = args.getContext<WizardContext>();

    if (exception instanceof HttpException) return;

    if (exception instanceof AppError) {
      const { message, isOperational, quitScene } = exception;

      let keyboard: Markup.Markup<ReplyKeyboardMarkup> | undefined;

      if (quitScene && telegramCtx.scene) {
        keyboard = mainKeyboard(telegramCtx.user);
        await telegramCtx.scene.leave();
      }

      if (isOperational) await telegramCtx.reply(message, keyboard);

      return;
    }

    if (telegramCtx.scene) await telegramCtx.scene.leave();

    const text = this.messagesHelper.get('bot.error');
    const keyboard = mainKeyboard(telegramCtx.user);
    await telegramCtx.reply(text, keyboard);
  }
}

export default TelegrafExceptionFilter;
