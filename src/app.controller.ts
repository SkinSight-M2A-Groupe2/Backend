import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseService } from './auth/supabase.service';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly supabaseService: SupabaseService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/usertest')
  async getClient(): Promise<any> {
    const supabaseClient = await this.supabaseService.getClient();

    const { data } = await supabaseClient.from('profiles').select('*');

    console.log(data);
    return data;
  }
}
