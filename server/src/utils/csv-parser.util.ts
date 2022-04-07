import { BadRequestException } from '@nestjs/common';

import { ErrorConstant } from 'src/constants/errors.constant';
import { UserSearchConstant } from 'src/modules/user-searches/user-search.constant';

import { ErrorUtil } from './error.util';

export const CSVParserToString = (files: File): string[] => {
  return files[0].buffer.toString()?.split(',') || [];
}

export const CSVLengthValidation = (
  parsedValues: string[],
  maximumLength: number = UserSearchConstant.CSVMaximumLength,
): void => {
  if (!parsedValues.length || parsedValues.length > maximumLength) {
    throw new BadRequestException(
      ErrorUtil.badRequest(
        ErrorConstant.Type.ExceedAllowedKeywords,
        ErrorConstant.Property.UploadCSVFile,
      ),
    );
  }
}
