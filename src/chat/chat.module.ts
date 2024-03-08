import { Module } from '@nestjs/common';
import { ChatController } from './controllers/chat.controller';
import { ChatService } from './services/chat.service';
import { SupabaseService } from 'src/auth/supabase.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, SupabaseService],
})
export class ChatModule {}
