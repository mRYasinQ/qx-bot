import { Global, Module } from '@nestjs/common';

import UserModule from '../user/user.module';
import NotificationService from './notification.service';

@Global()
@Module({
  imports: [UserModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
class NotificationModule {}

export default NotificationModule;
