import { Global, Module } from '@nestjs/common';

import MessagesHelper from './helpers/messages.helper';

@Global()
@Module({
  providers: [MessagesHelper],
  exports: [MessagesHelper],
})
class CommonModule {}

export default CommonModule;
