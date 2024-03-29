import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthUser } from '@supabase/supabase-js';
@Injectable()
export class SupabaseStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('SUPABASE_JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, user: AuthUser) {
    return user;
  }
}
