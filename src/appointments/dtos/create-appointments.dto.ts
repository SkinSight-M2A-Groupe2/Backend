import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @AutoMap()
  @ApiProperty()
  professional_id: number;
  @AutoMap()
  @ApiProperty()
  patient_id: bigint; //id du patient
  @AutoMap()
  @ApiProperty()
  readonly slots: string; //creneau horaire
  @AutoMap()
  @ApiProperty()
  readonly appointment_type: string;
  @AutoMap()
  @ApiProperty()
  readonly appointment_date: Date;
  @AutoMap()
  @ApiProperty()
  readonly result: string;
  @AutoMap()
  @ApiProperty()
  readonly status: string;
}
