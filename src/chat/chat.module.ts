import { Module } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { ChatController } from './controller/chat.controller';
import { SupabaseService } from 'src/auth/supabase.service';
@Module({
  controllers: [ChatController],
  providers: [ChatService, SupabaseService],
})
export class ChatModule {}
