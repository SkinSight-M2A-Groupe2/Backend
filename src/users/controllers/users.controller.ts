import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { SupabaseGuard } from 'src/auth/guards/supabase.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Get('/')
  @UseGuards(SupabaseGuard) // Apply SupabaseStrategy to this route
  findByJwt(@Req() req: any) {
    console.log('req', req.user.sub);
    const userId = req.user.sub;
    return this.usersService.findByJwt(userId);
  }
  /* findByJwt(@Supabgy() user: any) {
    const authorizationHeader = headers.authorization;
    
    // Access user information returned by SupabaseStrategy
    const user = authorizationHeader; // Replace this with your logic to extract user information
    return this.usersService.findByJwt(user.id);
  } */

  @Get('admin/all')
  findAllAdmin() {
    return this.usersService.findAll();
  }
  //Return les user dans le bon perimètre
  /* @Get('all')
  findAllUser() {
    return this.usersService.findAll();
  } */

  @Get('email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('like/:query')
  search(@Param('query') query: string) {
    return this.usersService.searchAllProfiles(query);
  }

  @Patch()
  @UseGuards(SupabaseGuard) // Apply SupabaseStrategy to this route
  update(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
    console.log('req', req.user.sub);
    const userId = req.user.sub;
    console.log('updateUserDto', updateUserDto);
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
