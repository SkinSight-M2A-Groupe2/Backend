import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from '../dtos/create-appointments.dto';
import { UpdateAppointmentDto } from '../dtos/update-appointments.dto';
import { SupabaseService } from '../../auth/supabase.service';
@Injectable()
export class AppointmentsService {
  private supabase: any;
  constructor(private readonly SupabaseService: SupabaseService) {
    this.initSupabase();
  }
  private async initSupabase() {
    this.supabase = await this.SupabaseService.getClient();
    return this.supabase;
  }

  async create(createAppointmentDto: CreateAppointmentDto): Promise<any> {
    const { data, error } = await this.supabase
      .from('appointments')
      .insert(createAppointmentDto)
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async findAllPatientAppointments(patient_id: bigint): Promise<any> {
    const { data, error } = await this.supabase
      .from('appointments')
      .select('*')
      .eq('patient_id', patient_id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async findAllProfessionalAppointments(professional_id: number): Promise<any> {
    const { data, error } = await this.supabase
      .from('appointments')
      .select('*')
      .eq('professional_id', professional_id);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async findOne(id: number): Promise<any> {
    const { data, error } = await this.supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('Appointment not found');
    }

    return data;
  }
  async remove(id: number): Promise<any> {
    const { data, error } = await this.supabase
      .from('appointments')
      .delete()
      .eq('id', id)
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    const { data, error } = await this.supabase
      .from('appointments')
      .update(updateAppointmentDto)
      .eq('id', id)
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async findAll() {
    const { data, error } = await this.supabase
      .from('appointments')
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
  async updateStatus(id: number, status: string) {
    const { data, error } = await this.supabase
      .from('appointments')
      .update({ status })
      .eq('id', id)
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
