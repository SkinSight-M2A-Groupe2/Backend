import { Module } from '@nestjs/common';
import { ProfessionalController } from './controllers/professional.controller';
import { ProfessionalService } from './services/professional.service';
import { SupabaseService } from 'src/auth/supabase.service';

@Module({
  controllers: [ProfessionalController],
  providers: [ProfessionalService, SupabaseService],
})
export class ProfessionalModule {}
