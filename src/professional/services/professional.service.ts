/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from '../dtos/create-professional.dto';
//import { UpdateProfessionalDto } from '../dto/update-professional.dto';
import { SupabaseService } from 'src/auth/supabase.service';

@Injectable()
export class ProfessionalService {
  private supabase: any;
  constructor(private readonly SupabaseService: SupabaseService) {
    this.initSupabase();
  }

  private async initSupabase() {
    this.supabase = await this.SupabaseService.getClient();
    return this.supabase;
  }

  async create(createProfessionalDto: CreateProfessionalDto): Promise<any> {
    const { data, error } = await this.supabase
      .from('professionals')
      .insert(createProfessionalDto);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async findOne(id:number) : Promise<any> {
    const { data, error } = await this.supabase
      .from('professionals')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Profile not found');
    }

    return data;
  }
  async findAllGeneralist() : Promise<any> {
    const { data, error } = await this.supabase
      .from('professionals')
      .select('*')
      .eq('type', 'generalist');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

    async findAllDermatologist() : Promise<any> {
        const { data, error } = await this.supabase
        .from('professionals')
        .select('*')
        .eq('type', 'dermatologist');
        if (error) {
        throw new Error(error.message);
        }
        return data;
    }

    async findAll() : Promise<any> {
        const { data, error } = await this.supabase
        .from('professionals')
        .select('*');
        if (error) {
        throw new Error(error.message);
        }
        return data;
    }
    
    async updateProfessional(id: number, updateProfessionalDto: any) : Promise<any> {
        const { data, error } = await this.supabase
        .from('professionals')
        .update(updateProfessionalDto)
        .eq('id', id);
        if (error) {
        throw new Error(error.message);
        }
        return data;
    }

    async getProfessionalProfile(id: number) : Promise<any> {
        const { data, error } = await this.supabase
        .from('professionals')
        .select('profiles(*)')
        .eq('id', id);
        if (error) {
        throw new Error(error.message);
        }
        return data;
    }
    async findProfile(id: number) : Promise<any> {
        const { data, error } = await this.supabase
        .from('professionals')
        .select('(*),profiles(last_name,first_name,email,phone)')
        .eq('id', id);
        if (error) {
        throw new Error(error.message);
        }
        return data;
    }
    async findMyProfile(userId: string) : Promise<any> {
        const { data, error } = await this.supabase
        .from('professionals')
        .select('(*),profiles(last_name,first_name,email,phone)')
        .eq('profile_id', userId);
        if (error) {
        throw new Error(error.message);
        }
        return data;
    }
    async updateProfile(id: number, updateProfessionalDto: any) : Promise<any> {
        const { data, error } = await this.supabase
        .from('professionals')
        .update(updateProfessionalDto)
        .eq('professional_id', id);
        if (error) {
        throw new Error(error.message);
        }
        return data;
    }
}
