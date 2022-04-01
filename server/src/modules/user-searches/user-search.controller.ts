import { Controller, HttpStatus, Post, Req, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import get from 'lodash/get';

import { PathConstant } from 'src/constants/app.constant';
import { AuthGuard } from 'src/guards/auth.guards';

import { UserSearchService } from './user-search.service';

@UseGuards(AuthGuard)
@Controller(PathConstant.UploadCsv)
export class UserSearchController {
  constructor(
    private readonly userSearchService: UserSearchService,
  ) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async create(@Res() res: Response, @Req() req: Request, @UploadedFiles() files) {
    const userId = get(req, 'userId');

    await this.userSearchService.handleCsv(files, userId)

    return res.status(HttpStatus.CREATED).json({ message: 'Import sucessfully' });
  }
}
