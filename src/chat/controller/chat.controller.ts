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
import { CreateChatDto } from '../dtos/create-chat.dto';
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Post()
  @UseGuards(SupabaseGuard)
  create(@Req() req: any, @Body() createChatDto: CreateChatDto) {
    const userId = req.user.sub;
    createChatDto.user_id = userId;
    return this.chatService.create(createChatDto);
  }
  @Get('/user/:id')
  @UseGuards(SupabaseGuard)
  findAllByUser(@Req() req: any) {
    const userId = req.user.sub;
    return this.chatService.findAllByUser(userId);
  }
  /*  @Get('professional')
    @UseGuards(SupabaseGuard)
    findAllByProfessional(@Req() req: any) {
      const professional_id = req.user.sub;
      return this.chatService.findAllByProfessional(professional_id);
    }
    @Get('/:id')
    findOne(@Param('id') id: number) {
      return this.chatService.findOne(id);
    }
    @Patch('/:id')
    update(
      @Param('id') id: number,
      @Body() updateChatDto: CreateChatDto,
    ) {
      return this.chatService.update(id, updateChatDto);
    }
    @Delete('/:id')
    remove(@Param('id') id: number) {
      return this.chatService.remove(id);
    } */
}
