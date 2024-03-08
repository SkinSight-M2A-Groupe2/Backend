import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @AutoMap()
  @ApiProperty()
  id_professional: string;


  @AutoMap()
  @ApiProperty()
  id_patient: string;

}
