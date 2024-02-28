import { Module } from '@nestjs/common';
import { AppointmentsController } from './controllers/appointments.controller';
import { AppointmentsService } from './services/appointments.service';
import { SupabaseService } from 'src/auth/supabase.service';

@Module({
  controllers: [AppointmentsController],
  providers: [AppointmentsService, SupabaseService],
})
export class AppointmentsModule {}
