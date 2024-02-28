import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @AutoMap()
  @ApiProperty()
  readonly first_name: string;

  @AutoMap()
  @ApiProperty()
  readonly last_name: string;
}
