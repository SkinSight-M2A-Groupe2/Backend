import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/auth/supabase.service';
import { CreateChatDto } from '../dtos/create-chat.dto';

@Injectable()
export class ChatService {
  private supabase: any;
  constructor(private readonly SupabaseService: SupabaseService) {
    this.initSupabase();
  }

  private async initSupabase() {
    this.supabase = await this.SupabaseService.getClient();
    //console.log('supabase', this.supabase);
    return this.supabase;
  }

  async create(createChatDto: CreateChatDto): Promise<any> {
    const { data, error } = await this.supabase
      .from('chats')
      .insert(createChatDto);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async findAllByUser(id: number) {
    const { data, error } = await this.supabase
      .from('chats')
      .select('*')
      .eq('user_id', id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
