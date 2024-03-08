import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateChatDto {
  @AutoMap()
  @ApiProperty()
  user_id: number;
  @AutoMap()
  @ApiProperty()
  professional_id: number;
  @AutoMap()
  @ApiProperty()
  message: string;
  @AutoMap()
  @ApiProperty()
  status: string;
}
