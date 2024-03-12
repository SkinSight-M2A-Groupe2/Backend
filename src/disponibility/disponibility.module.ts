import { Module } from '@nestjs/common';
import { DisponibilityController } from './controllers/disponibility.controller';
import { DisponibilityService } from './services/disponibility.service';
import { SupabaseService } from 'src/auth/supabase.service';

@Module({
  controllers: [DisponibilityController],
  providers: [DisponibilityService, SupabaseService],
})
export class DisponibilityModule {}
