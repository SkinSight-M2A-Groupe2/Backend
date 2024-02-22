/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateDisponibilityDto } from '../dtos/create-disponibility.dto';
import { SupabaseService } from 'src/auth/supabase.service';
@Injectable()
export class DisponibilityService {
  private supabase: any;
  constructor(private readonly SupabaseService: SupabaseService) {
    this.initSupabase();
  }
  private async initSupabase() {
    this.supabase = await this.SupabaseService.getClient();
    return this.supabase;
  }
  async create(
    userId: bigint,
    createDisponibilityDto: CreateDisponibilityDto,
  ): Promise<any> {
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

    // Now, create the disponibility with the professional's ID
    const { data, error } = await this.supabase.from('disponibility').insert([
      {
        disponibility: { ...createDisponibilityDto },
        id_professional: professionalId,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  async createByProfessionalId(
    userId: string,
    createDisponibilityDto: CreateDisponibilityDto,
  ): Promise<any> {}

  async findAll() {
    const { data, error } = await this.supabase.from('disponibility').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
