import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import jwt from 'jsonwebtoken';
import { get } from 'lodash';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const http = context.switchToHttp();
    const request = http.getRequest();
    const response = http.getResponse();

    response.setHeader('Cache-Control', 'no-store');
    const token = get(request, 'headers.authorization')?.split('Bearer ')[1];
    if (!token) {
      throw new UnauthorizedException();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        if (new Date(err.expiredAt) < new Date()) {
          response.clearCookie('refreshToken')
          response.clearCookie('accessToken');
        }
      throw new BadRequestException();
      }
      request.userId = decoded.userId;
    })
    return true;
  }
}
