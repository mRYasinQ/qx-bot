import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import EVENTS from '@/common/constants/events';
import MessagesHelper from '@/common/helpers/messages.helper';
import type { UserChangeStatusPayload, UserRegisterPayload } from '@/common/interfaces/events.interface';

import NotificationService from '../notification/notification.service';
import UserService from './user.service';

@Injectable()
class UserListener {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly messagesHelper: MessagesHelper,
    private readonly userService: UserService,
  ) {}

  @OnEvent(EVENTS.USER_REGISTERED)
  async handleUserRegistration(payload: UserRegisterPayload) {
    const { inviterId, user } = payload;

    let adminText = this.messagesHelper.get('user.new_user', { id: user.id });

    if (inviterId) {
      const inviter = await this.userService.findOne(inviterId);
      if (inviter) {
        const text = this.messagesHelper.get('user.inviter_notif', { tgId: user.tgId });
        adminText = this.messagesHelper.get('user.new_user_invited', { id: user.id, inviterId: inviter.id });

        void this.userService.update(user.id, { invitedBy: inviter.id });

        void this.notificationService.sendMessageToUser(inviter.tgId, text, { parse_mode: 'Markdown' });
      }
    }

    void this.notificationService.sendMessageToAdmins(adminText);
  }

  @OnEvent(EVENTS.USER_STATUS_CHANGED)
  handleUserChangeStatus(pyaload: UserChangeStatusPayload) {
    const { userId, isBlocked } = pyaload;

    void this.userService.update(userId, { isBlocked });

    const textKey = isBlocked ? 'user.blocked' : 'user.unblocked';
    const adminText = this.messagesHelper.get(textKey, { id: userId });
    void this.notificationService.sendMessageToAdmins(adminText);
  }
}

export default UserListener;
