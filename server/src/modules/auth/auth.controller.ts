import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import get from 'lodash/get';

import { LoginDTO } from '../users/dto/login.dto';
import { RegisterDTO } from '../users/dto/register.dto';
import { UserDTO } from '../users/dto/user.dto';
import { UserConstant } from '../users/user.constant';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

  @Get('/token')
  async refreshToken(
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const refreshToken = req.cookies.refreshToken;

    const accessToken = await this.authService.refreshToken(refreshToken, res);

    res.json({ accessToken });
  }

  @Post('/register')
  async register(
    @Body() registerDTO: RegisterDTO,
  ): Promise<UserDTO> {
    const user = await this.authService.register(registerDTO);

    return plainToClass(UserDTO, user);
  }

  @Post('/login')
  async login(
    @Body() loginDTO: LoginDTO,
    @Res() res: Response,
  ): Promise<void> {
    const [accessToken, refreshToken] = await this.authService.login(loginDTO);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: UserConstant.MaxAge,
    });
    res.cookie('accessToken', accessToken);
    res.json({ accessToken });
  }

  @Post('/logout')
  async logout(
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    // const refreshToken = get(req, 'cookies.refreshToken');
    // if (refreshToken) {
    const accessToken = get(req, 'headers.authorization');
    if (accessToken) {
      await this.authService.logout(accessToken);
      this.authService.clearCookie(res);
      return res.status(200).json({});
    }
  }
}
