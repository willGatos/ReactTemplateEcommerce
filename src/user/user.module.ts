import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt/jwt.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ShopModule } from 'src/shop/shop.module';
import { ShopService } from 'src/shop/shop.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({secret: 'W*11*4m16'}),
    forwardRef(() => ShopModule)
  ],
  controllers: [UserController],
  providers: [UserService ],
  exports: [UserService, PassportModule],
})
export class UserModule {}
