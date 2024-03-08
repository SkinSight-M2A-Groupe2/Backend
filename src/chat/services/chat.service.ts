import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/auth/supabase.service';

@Injectable()
export class ChatService {
  private supabase: any;
  constructor(private readonly SupabaseService: SupabaseService) {
    this.initSupabase();
  }
  private async initSupabase() {
    this.supabase = await this.SupabaseService.getClient();
    return this.supabase;
  }

  // creer un chat + salon de discussion que medecin avec un patient
  async create(userId: bigint, createChatDto: any): Promise<any> {
    const { data: professionalData, error: professionalError } =
      await this.supabase
        .from('professionals')
        .select('id')
        .eq('profile_id', userId)
        .single();
    if (professionalError) {
      throw new Error(professionalError.message);
    }
    if (!professionalData) {
      throw new Error('Professional not found for the given userId');
    }
    const professionalId = professionalData.id;
    const { data, error } = await this.supabase.from('chat').insert();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
