/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { SupabaseService } from '../../auth/supabase.service';

@Injectable()
export class UsersService {
  private supabase: any;
  constructor(private readonly SupabaseService: SupabaseService) {
    this.initSupabase();
  }

  private async initSupabase() {
    // Ensure that this.SupabaseService.getClient() is called
    this.supabase = await this.SupabaseService.getClient();
    //console.log('supabase', this.supabase);
    return this.supabase;
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<any[]> {
    const { data, error } = await this.supabase.from('profiles').select('*');
    console.log('data', data);
    if (error) throw new Error(error.message);
    return data;
  }
  async findAllAdmin(): Promise<any[]> {
    const { data, error } = await this.supabase.from('profiles').select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  async findOne(id: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      // If user with the specified ID is not found, throw NotFoundException
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return data;
  }
  async findOneByEmail(email: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      // If user with the specified ID is not found, throw NotFoundException
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return data;
  }
  async searchAllProfiles(query: string): Promise<any[]> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .or(
        `email.ilike.%${query}%`,
        `first_name.ilike.%${query}%`,
        `last_name.ilike.%${query}%`,
        `phone.ilike.%${query}%`,
      );

    if (error) {
      throw new Error(error.message);
    }
    console.log('data', data);
    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    console.log('updateUserDto', updateUserDto.first_name);
    const { data, error } = await this.supabase
      .from('profiles')
      .update(updateUserDto)
      .eq('id', id);
    if (error) {
      throw new Error(error.message);
    }
    return '201';
  }
  async findByJwt(userId: any) {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
