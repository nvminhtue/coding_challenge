import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { ErrorConstant } from 'src/constants/errors.constant';
import { ErrorUtil } from 'src/utils/error.util';

import { LoginDTO } from '../users/dto/login.dto';
import { RegisterDTO } from '../users/dto/register.dto';
import { UserEntity } from '../users/user.entity';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    private readonly userService: UserService,
  ) { }

  async register(registerDTO: RegisterDTO): Promise<UserEntity> {
    const { name, email, username, password } = registerDTO;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await this.userRepo.create({
      name,
      email,
      username,
      password: hashPassword,
    })

    await this.userRepo.save(user)

    return user;
  }

  async login(loginDTO: LoginDTO): Promise<[string, string]> {
    let isMatchedPassword = false;
    const { password, email } = loginDTO;
    const user = await this.userRepo.createQueryBuilder().where({ email }).getOne();
    if (user) {
      isMatchedPassword = await bcrypt.compare(password, user.password);
    }

    if (!isMatchedPassword || !user) {
      throw new BadRequestException(
        ErrorUtil.badRequest(
          ErrorConstant.Type.IsWrongPassword,
          ErrorConstant.Property.EmailOrPassword,
          UserEntity.name,
        ),
      );
    }
    const userId = user.id;
    const username = user.username;

    const accessToken = jwt.sign({ userId, username, email }, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1d'
    });
    const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: '15d'
    })

    await this.userRepo.update({ id: userId }, {
      refreshToken,
    })

    return [accessToken, refreshToken];
  }

  async logout(token: string): Promise<void> {
    let email;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (!err) {
        email = decoded.email;
      }
    })

    const user = await this.userService.findUser({ email });

    if (user) {
      await this.userRepo.update({ id: user.id }, {
        refreshToken: null,
      })
    }
  }
}
