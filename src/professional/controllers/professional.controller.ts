import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProfessionalService } from '../services/professional.service';
import { CreateProfessionalDto } from '../dtos/create-professional.dto';
import { SupabaseGuard } from 'src/auth/guards/supabase.guard';
//import { UpdateProfessionalDto } from '../dto/update-professional.dto';

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}
  @Post()
  @UseGuards(SupabaseGuard)
  create(
    @Req() req: any,
    @Body() createProfessionalDto: CreateProfessionalDto,
  ) {
    const userId = req.user.sub;
    console.log(createProfessionalDto);
    createProfessionalDto.profile_id = userId;
    return this.professionalService.create(createProfessionalDto);
  }

  @Get('/all')
  findAll() {
    return this.professionalService.findAll();
  }
  @Get('generalist')
  findAllGeneralist() {
    return this.professionalService.findAllGeneralist();
  }
  @Get('dermatologist')
  findAllDermatologist() {
    return this.professionalService.findAllDermatologist();
  }
  @Get('professional/profile/me')
  @UseGuards(SupabaseGuard)
  findMyProfile(@Req() req: any) {
    const userId = req.user.sub;
    return this.professionalService.findMyProfile(userId);
  }
  @Get('professional/profile/:id')
  findProfile(@Param('id') id: number) {
    return this.professionalService.findProfile(id);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.professionalService.findOne(id);
  }
  @Patch('professional/profile')
  update(
    @Req() req: any,
    @Body() updateProfessionalDto: CreateProfessionalDto,
  ) {
    const professional_id = req.user.sub;
    return this.professionalService.updateProfile(
      professional_id,
      updateProfessionalDto,
    );
  }
}
