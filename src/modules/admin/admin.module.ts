import { Module } from '@nestjs/common';

import AdminUpdate from './admin.update';

@Module({
  providers: [AdminUpdate],
})
class AdminModule {}

export default AdminModule;
