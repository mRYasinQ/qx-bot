import { EventEmitter2 } from '@nestjs/event-emitter';

import { Action, Command, Ctx, Hears, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import type { WizardContext } from 'telegraf/scenes';

import CALLBACK_BUTTONS from '@/common/constants/callback-buttons';
import EVENTS from '@/common/constants/events';
import REPLY_BUTTONS from '@/common/constants/reply-buttons';
import CurrentUser from '@/common/decorators/current-user.decorator';
import MessagesHelper from '@/common/helpers/messages.helper';
import type { UserChangeStatusPayload, UserRegisterPayload } from '@/common/interfaces/events.interface';
import type User from '@/common/interfaces/user.interface';
import { mainKeyboard } from '@/common/keyboards/main';

@Update()
class BotUpdate {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly messagesHelper: MessagesHelper,
  ) {}

  @On('my_chat_member')
  onBotBlocked(@Ctx() ctx: Context, @CurrentUser() user: User) {
    const myChatMember = ctx.myChatMember;
    const chatType = myChatMember?.chat.type;

    if (myChatMember && chatType === 'private') {
      const newStatus = myChatMember.new_chat_member.status;

      const payload: UserChangeStatusPayload = { userId: user.id, isBlocked: newStatus === 'kicked' };
      this.eventEmitter.emit(EVENTS.USER_STATUS_CHANGED, payload);
    }
  }

  @Start()
  @Command('main')
  @Hears([REPLY_BUTTONS.BACK_MAIN])
  async onStart(@Ctx() ctx: WizardContext, @CurrentUser() user: User) {
    const keyboard = mainKeyboard(user);

    if (ctx.scene) await ctx.scene.leave();

    if (user.isNewUser) {
      const text = this.messagesHelper.get('bot.welcome');
      await ctx.reply(text, keyboard);

      const startCommand = ctx.text?.split(' ');
      const startPayload = startCommand?.[1];
      const inviterId = user.tgId !== startPayload ? startPayload : undefined;

      const payload: UserRegisterPayload = { user, inviterId };
      this.eventEmitter.emit(EVENTS.USER_REGISTERED, payload);

      return;
    }

    const text = this.messagesHelper.get('bot.start');
    await ctx.reply(text, keyboard);
  }

  @Action(CALLBACK_BUTTONS.EXIT.callback_data)
  async handleExit(@Ctx() ctx: Context) {
    await ctx.deleteMessage();
  }
}

export default BotUpdate;
