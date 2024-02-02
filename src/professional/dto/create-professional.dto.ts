import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfessionalDto {
  @AutoMap()
  @ApiProperty()
  readonly profile_id: string;

  @AutoMap()
  @ApiProperty()
  readonly address_1: string;

  @AutoMap()
  @ApiProperty()
  readonly address_2: string;

  @AutoMap()
  @ApiProperty()
  readonly city: string;

  @AutoMap()
  @ApiProperty()
  readonly country: string;

  @AutoMap()
  @ApiProperty()
  readonly postal_code: string;

  @AutoMap()
  @ApiProperty()
  readonly type: string;
}
