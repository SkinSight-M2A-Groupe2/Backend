import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SupabaseGuard } from 'src/auth/guards/supabase.guard';
import { ChatService } from '../services/chat.service';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post(':id')
  @UseGuards(SupabaseGuard)
  create(@Req() req: any, @Body() createChatDto: any) {
    const userId = req.user.sub;
    createChatDto.id_professional = userId;
    console.log(createChatDto);
    //return this.chatService.create(userId, createChatDto);
  }
 /*  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChatDto: any) {
    return this.chatService.update(+id, updateChatDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(id);
  } */
}
