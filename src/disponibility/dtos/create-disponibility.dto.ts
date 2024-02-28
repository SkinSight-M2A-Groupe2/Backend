import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDisponibilityDto {
  @AutoMap()
  @ApiProperty()
  id_professional: string;

  @AutoMap()
  @ApiProperty()
  readonly disponibility: JSON;
}
