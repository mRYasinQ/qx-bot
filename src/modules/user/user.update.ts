import { Ctx, Hears, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

import CALLBACK_BUTTONS from '@/common/constants/callback-buttons';
import REPLY_BUTTONS from '@/common/constants/reply-buttons';
import PERMISSIONS from '@/common/constants/user-permissions';
import CallbackParam from '@/common/decorators/callback-param.decorator';
import { CheckPermission } from '@/common/decorators/check-permission.decorator';
import OnCallback from '@/common/decorators/on-callback.decorator';
import MessagesHelper from '@/common/helpers/messages.helper';
import { usersKeyboard } from '@/common/keyboards/user';
import { numericIdSchema, pageSchema } from '@/common/schemas/shared.schema';

import UserService from './user.service';

@Update()
class UserUpdate {
  constructor(
    private readonly messagesHelper: MessagesHelper,
    private readonly userService: UserService,
  ) {}

  private readonly USERS_LIMIT = 10;

  @Hears(REPLY_BUTTONS.USERS)
  @CheckPermission(PERMISSIONS.MANAGE_USERS)
  async onManageUsersMenu(@Ctx() ctx: Context) {
    const result = await this.userService.findAll({ limit: this.USERS_LIMIT });

    const text = this.messagesHelper.get('user.manage');
    const keyboard = usersKeyboard(result);
    await ctx.reply(text, keyboard);
  }

  @OnCallback(CALLBACK_BUTTONS.USERS_PREFIX)
  async onUsersPagination(@Ctx() ctx: Context, @CallbackParam(pageSchema) page: number) {
    const result = await this.userService.findAll({ limit: this.USERS_LIMIT, page });

    const text = this.messagesHelper.get('user.manage');
    const keyboard = usersKeyboard(result);
    await ctx.editMessageText(text, keyboard);
  }

  @OnCallback(CALLBACK_BUTTONS.USER_PREFIX)
  async onSelectUser(@Ctx() ctx: Context, @CallbackParam(numericIdSchema) param: number) {
    await ctx.answerCbQuery(param.toString());
  }
}

export default UserUpdate;
