import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from './dto/auth.dto';
import { Response } from 'express';
import { RegistrationGuard } from './guards/registration.guard';
import { LoginUserDTO } from './dto/login-user.dto';
import { LoginGuard } from './guards/login.guard';
import { AuthService } from './auth.service';
import { RefreshJWTGuard } from './guards/refresh-jwt.guard';
import { RefreshTokenDTO } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @UseGuards(LoginGuard)
  @Post('login')
  async loginUser(@Body() loginUserDTO: LoginUserDTO, @Res() res: Response) {
    const user = await this.userService.login(loginUserDTO);

    const access = await this.authService.generateAccessToken(user);
    const refresh = await this.authService.generateRefreshToken(
      user._id as string,
    );
    res.statusCode = HttpStatus.OK;
    return res.send({ ...access, ...refresh, username: user.username });
  }

  @UseGuards(RegistrationGuard)
  @Post('registration')
  async registrationUser(
    @Body() createUserDTO: CreateUserDTO,
    @Res() res: Response,
  ) {
    await this.userService.registration(createUserDTO);
    res.statusCode = HttpStatus.CREATED;
    return res.send('user created');
  }

  @UseGuards(RefreshJWTGuard)
  @Post('refresh')
  async refreshToken(
    @Body() refreshTokenDTO: RefreshTokenDTO,
    @Res() res: Response,
  ) {
    const validToken = await this.authService.verifyToken(
      refreshTokenDTO.refresh_token,
    );
    const user = await this.userService.findOne(refreshTokenDTO.username);
    const access = await this.authService.generateAccessToken(user);
    if (validToken?.error) {
      if (validToken?.error === 'jwt expired') {
        const refresh = await this.authService.generateRefreshToken(
          user._id as string,
        );
        res.statusCode = HttpStatus.OK;
        return { ...access, ...refresh };
      } else {
        res.statusCode = HttpStatus.BAD_REQUEST;
        return res.send({ error: validToken?.error });
      }
    } else {
      res.statusCode = HttpStatus.OK;
      return { ...access, refresh_token: refreshTokenDTO.refresh_token };
    }
  }
}
