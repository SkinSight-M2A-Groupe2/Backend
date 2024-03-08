import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SupabaseModule } from './auth/supabase.module';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { APP_GUARD } from '@nestjs/core';
import { SupabaseGuard } from './auth/guards/supabase.guard';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { ProfessionalModule } from './professional/professional.module';
import { DisponibilityModule } from './disponibility/disponibility.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
  controllers: [AppController],
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60,
        limit: 10,
      },
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    SupabaseModule,
    UsersModule,
    ChatModule,
    UsersModule,
    ProfessionalModule,
    DisponibilityModule,
    AppointmentsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: SupabaseGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
  ],
})
export class AppModule {}
