import { Module, ClassSerializerInterceptor } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';


@Module({
  imports: [],
  providers: [ClientService, PrismaService, JwtService ,{
    provide: APP_INTERCEPTOR,
    useClass: ClassSerializerInterceptor
  },
  // {provide: APP_GUARD, useClass: AuthGuard}
],
  controllers: [ClientController]
})
export class ClientModule { }
