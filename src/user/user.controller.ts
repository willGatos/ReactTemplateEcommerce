import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { signInDto } from './dto/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService,  ) {}

  @Post('/sign-in')
  async sign(@Body() signedUserDto: signInDto) {
    try {
      const userEmail = { email: signedUserDto.email };

      const foundedUser = await this.userService.findOneByEmail(userEmail.email);

      if (foundedUser) {
        if(foundedUser.password == signedUserDto.password){
          const token = await this.userService.getToken(foundedUser);
          return {user: foundedUser, token, };
        }
      }
      throw new HttpException('Contraseña o Email Incorrecto', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.error(error);
      throw new HttpException('Contraseña o Email Incorrecto', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  /* @Get(':id')
  findOne(@Body() user: Object) {
    return this.userService.findOne(user);
  } */

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
