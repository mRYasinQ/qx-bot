import { Markup } from 'telegraf';

import UserEntity from '@/modules/user/user.entity';

import CALLBACK_BUTTONS from '../constants/callback-buttons';
import type { PaginatedResult } from '../interfaces/pagination.interface';
import { chunkArray } from '../utils/array.util';
import { paginationKeyboard } from './main';

const usersKeyboard = (result: PaginatedResult<UserEntity>) => {
  const buttons = [[CALLBACK_BUTTONS.SEARCH_TG_ID, CALLBACK_BUTTONS.SEARCH_USERS_ID], [CALLBACK_BUTTONS.USERS]];

  const { items: users, ...paginationData } = result;

  if (users.length) {
    const userButtons = users.map((user) => CALLBACK_BUTTONS.USER_DETAIL(user.id));
    const userRows = chunkArray(userButtons, 2);
    buttons.push(...userRows);
  } else {
    buttons.push([CALLBACK_BUTTONS.EMPTY]);
  }

  const keyboard = paginationKeyboard(CALLBACK_BUTTONS.USERS_PREFIX, paginationData);
  if (keyboard) buttons.push(keyboard);

  buttons.push([CALLBACK_BUTTONS.EXIT]);

  return Markup.inlineKeyboard(buttons);
};

export { usersKeyboard };
