import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import get from 'lodash/get';

import { RequestPagyDTO } from 'src/common/pagy/dto/request-pagy.dto';
import { PathConstant } from 'src/constants/app.constant';
import { AuthGuard } from 'src/guards/auth.guards';

import { UserSearchesDTO } from './dto/user-searches.dto';
import { UserSearchService } from './user-search.service';

@UseGuards(AuthGuard)
@Controller(PathConstant.SearchListPath)
export class UserSearchController {
  constructor(
    private readonly userSearchService: UserSearchService,
  ) { }

  @Post(PathConstant.UploadCsv)
  @UseInterceptors(AnyFilesInterceptor())
  async create(@Res() res: Response, @Req() req: Request, @UploadedFiles() files) {
    const userId = get(req, 'userId');

    await this.userSearchService.handleCsv(files, userId)

    return res.status(HttpStatus.CREATED).json({ message: 'Import sucessfully' });
  }

  @Get()
  async fetchList(
    @Res()res: Response,
    @Req() req: Request,
    @Query('pagyInfo') requestPagyDTO: RequestPagyDTO,
  ) {
    const userId = get(req, 'userId');

    const [items, pagyInfo] = await this.userSearchService.getList(userId, requestPagyDTO);

    const result = plainToClass(UserSearchesDTO, {
      items,
      pagyInfo,
    });

    res.status(HttpStatus.OK).json(result)
  }
}
