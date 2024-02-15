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
import { AppointmentsService } from '../services/appointments.service';
import { CreateAppointmentDto } from '../dtos/create-appointments.dto';
import { UpdateAppointmentDto } from '../dtos/update-appointments.dto';

@Controller('appointments')
export class AppointmentsController {
  //ici on va creer les routes pour les rendez-vous
  constructor(private readonly appointmentsService: AppointmentsService) {
    //creation par utilisateu
    //modification annulation par utilisateur ou professionnel acceptation par professionnel
    //suppression
  }
  /* creation d'un rendez-vous il faut :
    - etre connecté
    - avoir un compte patient
    - un id professionnel 
    - une crénau horaire/slot
    - un type de rendez-vous
    */
  @Post()
  @UseGuards(SupabaseGuard)
  create(@Req() req: any, @Body() createAppointmentDto: CreateAppointmentDto) {
    const userId = req.user.sub;
    createAppointmentDto.patient_id = userId;
    return this.appointmentsService.create(createAppointmentDto);
  }
  @Get('patient')
  @UseGuards(SupabaseGuard)
  findAllPatientAppointments(@Req() req: any) {
    const userId = req.user.sub;
    return this.appointmentsService.findAllPatientAppointments(userId);
  }
  @Get('professional')
  @UseGuards(SupabaseGuard)
  findAllProfessionalAppointments(@Req() req: any) {
    const professional_id = req.user.sub;
    return this.appointmentsService.findAllProfessionalAppointments(
      professional_id,
    );
  }
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.appointmentsService.findOne(id);
  }
  @Patch('/:id')
  update(
    @Param('id') id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appointmentsService.remove(id);
  }
}
