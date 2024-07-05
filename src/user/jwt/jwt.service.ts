import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface JwtPayload {
    email: string;
    shop: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private UserModel: Model<User>,
  ) {
    super({
      secretOrKey: 'W*11*4m16',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload): Promise<User> {
    const { email } = payload;

    const user = await this.UserModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}