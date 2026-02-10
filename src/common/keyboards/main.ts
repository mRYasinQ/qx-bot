import { Markup } from 'telegraf';

import type User from '@/common/interfaces/user.interface';
import { hasAllPermissions } from '@/common/utils/permission.util';

import REPLY_BUTTONS from '../constants/reply-buttons';

const mainKeyboard = (user: User) => {
  const buttons: string[][] = [
    [REPLY_BUTTONS.BUY_SERVICE],
    [REPLY_BUTTONS.MY_SERVICE, REPLY_BUTTONS.FREE_SERVICE],
    [REPLY_BUTTONS.INCREASE_BALANCE, REPLY_BUTTONS.ACCOUNT],
    [REPLY_BUTTONS.SUPPORT, REPLY_BUTTONS.TARIFF, REPLY_BUTTONS.GUIDE],
  ];

  if (hasAllPermissions(user.permissions, ['display_admin'])) {
    buttons.push([REPLY_BUTTONS.TEST_SERVICE, REPLY_BUTTONS.PANEL]);
  }

  return Markup.keyboard(buttons).resize().placeholder('لطفا انتخاب کنید');
};

export { mainKeyboard };
