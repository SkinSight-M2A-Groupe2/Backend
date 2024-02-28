import { PartialType } from '@nestjs/swagger';
import { CreateDisponibilityDto } from './create-disponibility.dto';

export class UpdateDisponibilityDto extends PartialType(
  CreateDisponibilityDto,
) {}
