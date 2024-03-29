import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { SupabaseGuard } from 'src/auth/guards/supabase.guard';
import { DisponibilityService } from '../services/disponibility.service';
import { CreateDisponibilityDto } from '../dtos/create-disponibility.dto';
@Controller('disponibility')
export class DisponibilityController {
  constructor(private readonly disponibilityService: DisponibilityService) {}
  @Post()
  @UseGuards(SupabaseGuard)
  create(
    @Req() req: any,
    @Body() createDisponibilityDto: CreateDisponibilityDto,
  ) {
    const userId = req.user.sub;
    createDisponibilityDto.id_professional = userId;
    return this.disponibilityService.create(userId, createDisponibilityDto);
  }

  @Get()
  @UseGuards(SupabaseGuard)
  findAll() {
    return this.disponibilityService.findAll();
  }
  @Get('/professional/:id')
  @UseGuards(SupabaseGuard)
  findAllByProfessional(@Param('id') id: number) {
    return this.disponibilityService.findAllByProfessional(id);
  }
  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.disponibilityService.findOne(id);
  }
  /* @Get(':id')
  findOne(@Param('id') id: string) {
    return this.disponibilityService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDisponibilityDto: UpdateDisponibilityDto,
  ) {
    return this.disponibilityService.update(+id, updateDisponibilityDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.disponibilityService.remove(id);
  } */
}
