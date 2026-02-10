import { Injectable } from '@nestjs/common';

import { raw } from '@mikro-orm/core';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import type { Message } from 'telegraf/types';

import UserPermission from '@/common/constants/user-permissions';

import type { ExtraReplyMessage } from 'node_modules/telegraf/typings/telegram-types';

import UserService from '../user/user.service';

@Injectable()
class NotificationService {
  constructor(
    @InjectBot() private readonly bot: Telegraf<Context>,
    private readonly userService: UserService,
  ) {}

  sendMessageToUser(chatId: string | number, text: string, extra?: ExtraReplyMessage): Promise<Message.TextMessage> {
    return this.bot.telegram.sendMessage(chatId, text, extra);
  }

  async sendMessageToAdmins(text: string, extra?: ExtraReplyMessage) {
    const { items: admins } = await this.userService.findAll({
      where: {
        $and: [
          raw(`exists (select 1 from json_each(permissions) where value = ?)`, [UserPermission.IMPORTANT_NOTIFICATIONS]),
          { isBlocked: false },
          { isActive: true },
        ],
      },
      disablePagination: true,
    });

    const adminIds = admins.map((admin) => admin.tgId);
    const promises = adminIds.map((id) => this.sendMessageToUser(id, text, extra));

    return Promise.all(promises);
  }
}

export default NotificationService;
