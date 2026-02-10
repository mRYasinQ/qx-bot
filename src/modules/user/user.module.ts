import { Module } from '@nestjs/common';

import { MikroOrmModule } from '@mikro-orm/nestjs';

import AuthMiddleware from './middlewares/auth.middleware';
import UserEntity from './user.entity';
import UserListener from './user.listener';
import UserService from './user.service';

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserListener, AuthMiddleware],
  exports: [UserService, AuthMiddleware],
})
class UserModule {}

export default UserModule;
