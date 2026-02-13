import { Markup } from 'telegraf';

import type User from '@/common/interfaces/user.interface';
import { hasAllPermissions } from '@/common/utils/permission.util';

import REPLY_BUTTONS from '../constants/reply-buttons';
import type { PaginatedResult } from '../interfaces/pagination.interface';

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

const adminKeyboard = () => {
  const buttons = [
    [REPLY_BUTTONS.STATS],
    [REPLY_BUTTONS.FORCE_JOIN, REPLY_BUTTONS.SETTINGS],
    [REPLY_BUTTONS.FACTOR, REPLY_BUTTONS.MANAGE_SERVICE, REPLY_BUTTONS.USERS],
    [REPLY_BUTTONS.SUBMIT_PAYMENT, REPLY_BUTTONS.TARIFFS],
    [REPLY_BUTTONS.SUBSCRIPTIONS],
    [REPLY_BUTTONS.SERVICES, REPLY_BUTTONS.SERVERS],
    [REPLY_BUTTONS.GLOBAL_MESSAGE, REPLY_BUTTONS.GIFTS],
    [REPLY_BUTTONS.BACK_MAIN],
  ];

  return Markup.keyboard(buttons).resize().placeholder('مدیر عزیز، لطفا انتخاب کنید');
};

const paginationKeyboard = (prefix: string, options: Omit<PaginatedResult<never>, 'items' | 'total'>) => {
  const { pages, page, nextPage, prevPage } = options;

  if (pages <= 1) return null;

  const buttons = [
    { text: '◀️', callback_data: `${prefix}${prevPage}` },
    { text: `${page}`, callback_data: `default` },
    { text: '▶️', callback_data: `${prefix}${nextPage}` },
  ];

  return buttons;
};

export { mainKeyboard, adminKeyboard, paginationKeyboard };
