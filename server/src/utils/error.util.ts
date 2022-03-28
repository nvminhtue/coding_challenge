import { plainToInstance } from 'class-transformer';
import camelCase from 'lodash/camelCase';
import includes from 'lodash/includes';
import { EntityNotFoundError } from 'typeorm';

import { ErrorDTO } from '../common/error.dto';
import {
  DatabaseErrorCode,
  ErrorConstant,
  ErrorLevelsConstant,
  ErrorTypesConstant,
} from '../constants/errors.constant';

export class ErrorUtil {
  static getErrorType(error: any) {
    const errorTypes = Object.keys(error.constraints);
    const highError = errorTypes.find(errType =>
      includes(ErrorLevelsConstant.High, errType));
    if (highError) {
      return highError;
    }

    const mediumError = errorTypes.find(errType =>
      includes(ErrorLevelsConstant.Medium, errType));
    if (mediumError) {
      return mediumError;
    }

    return errorTypes[0];
  }

  static badRequest(
    errorType: string,
    property?: string,
    entity: string = null,
    payload?: object,
  ): ErrorDTO | ErrorDTO[] {
    let codeAndMessage = ErrorTypesConstant[errorType];
    if (codeAndMessage instanceof Function) {
      codeAndMessage = codeAndMessage(payload);
    }
    return plainToInstance(ErrorDTO, { entity, property, ...codeAndMessage });
  }

  static queryFailedError(exception, errorCode: number, entity: string): ErrorDTO {
    switch (errorCode) {
      case DatabaseErrorCode.uniqueViolation:
        const property = camelCase(
          exception.detail.match(ErrorConstant.GetPropertyInMessageRegex)[1]
          .split(', ')
          .pop());
        const { code, message } = ErrorTypesConstant.uniqueViolation;
        return plainToInstance(ErrorDTO, { code, message, entity, property });
    }
  }

  static entityNotFoundError(error: EntityNotFoundError): ErrorDTO {
    const entity = error.message.match(ErrorConstant.GetEntityInMessageRegex)[0];
    const property = ErrorConstant.ErrorOnPrimaryKey;
    const { code, message } = ErrorTypesConstant.entityNotFound;

    return plainToInstance(ErrorDTO, { entity, property, code, message });
  }

  static internalServerError(): ErrorDTO {
    const { code, message } = ErrorTypesConstant.internalServer;

    return plainToInstance(ErrorDTO, { code, message });
  }
}
