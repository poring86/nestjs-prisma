import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    console.log('connecting');
    await this.$connect();
    console.log('prisma connected');
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      console.log('closing');
      await app.close();
      console.log('closed');
    });
  }
}
