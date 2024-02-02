import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessionalService } from '../services/professional.service';
import { CreateProfessionalDto } from '../dto/create-professional.dto';
import { AuthGuard } from '@nestjs/passport';
//import { UpdateProfessionalDto } from '../dto/update-professional.dto';

@Controller('professionals')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}
  @Post()
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalService.create(createProfessionalDto);
  }
  @Get('generalist')
  findAllGeneralist() {
    return this.professionalService.findAllGeneralist();
  }
  @Get('dermatologist')
  findAllDermatologist() {
    return this.professionalService.findAllDermatologist();
  }
  @Get('profile/me')
  findMyProfile(@Param('id') id: number){
    return this.professionalService.findMyProfile(id);
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.professionalService.findOne(id);
  }
}
