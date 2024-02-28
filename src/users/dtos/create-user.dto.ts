import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @AutoMap()
  @ApiProperty()
  readonly email: string;

  @AutoMap()
  @ApiProperty()
  readonly first_name: string;

  @AutoMap()
  @ApiProperty()
  readonly last_name: string;

  /* @AutoMap()
  @ApiProperty()
  readonly phone: string;

  @AutoMap()
  @ApiProperty()
  readonly avatar_url: string;*/
}
