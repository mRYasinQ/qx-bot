import { Ctx, Hears, Update } from 'nestjs-telegraf';
import type { WizardContext } from 'telegraf/scenes';

import REPLY_BUTTONS from '@/common/constants/reply-buttons';
import PERMISSIONS from '@/common/constants/user-permissions';
import { CheckPermission } from '@/common/decorators/check-permission.decorator';
import MessagesHelper from '@/common/helpers/messages.helper';
import { adminKeyboard } from '@/common/keyboards/main';

@Update()
@CheckPermission(PERMISSIONS.DISPLAY_ADMIN)
class AdminUpdate {
  constructor(private readonly messagesHelper: MessagesHelper) {}

  @Hears([REPLY_BUTTONS.PANEL, REPLY_BUTTONS.BACK_ADMIN])
  async handleAdminPanel(@Ctx() ctx: WizardContext) {
    if (ctx.scene) await ctx.scene.leave();

    const text = this.messagesHelper.get('admin.welcome');
    const keyboard = adminKeyboard();
    await ctx.reply(text, keyboard);
  }
}

export default AdminUpdate;
