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
    const token = get(request, 'headers.authorization');
    if (!token) {
      throw new UnauthorizedException();
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) throw new BadRequestException();
      request.email = decoded.email;
    })
    return true;
  }
}
