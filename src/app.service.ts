import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'SERVER BACK NEST RUNNING  OK ! ';
  }

  
}
