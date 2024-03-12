import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class SupabaseGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info: Error) {
    console.log('Handling user', user);
    if (err || !user) {
      throw err || new Error(info.message);
    }
    return user;
  }
}
