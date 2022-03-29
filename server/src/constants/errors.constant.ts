export const ErrorTypesConstant = {
  internalServer: {
    code: 4000,
    message: 'INTERNAL_SERVER_ERROR',
  },
  entityNotFound: {
    code: 2001,
    message: 'Entity not found',
  },
  uniqueViolation: {
    code: 2002,
    message: 'Unique violation',
  },
  isNotUUID: {
    code: 2003,
    message: 'Not UUID',
  },
  isNotEmpty: {
    code: 2004,
    message: 'This field can not be empty',
  },
  isString: {
    code: 2005,
    message: 'This field must have string type',
  },
  maxLength: {
    code: 2006,
    message: 'This field exceed allowed characters',
  },
  isEmail: {
    code: 2007,
    message: 'This field must have email type',
  },
  isPasswordConfirmation: {
    code: 2008,
    message: 'Confirm password should be matched with password',
  },
  isWrongPassword: {
    code: 2009,
    message: 'Wrong password',
  },
};

export const TableNameMappingConstant = {
  samples: 'SampleEntity'
};

export const ErrorLevelsConstant = {
  High: ['internalServer', 'isNotEmpty'],
  Medium: [
    'forbidden',
    'pageNotFound',
    'somethingWrong',
    'isString',
    'isInt'
  ],
};

export const DatabaseErrorCode = {
  uniqueViolation: 23505,
  isNotUUID: 23505,
};

export const ErrorConstant = {
  ErrorOnPrimaryKey: 'id',
  GetPropertyInMessageRegex: /^Key \((.*)\)=\(.*\) already exists.$/,
  GetEntityInMessageRegex: /(\w+)Entity/g,
  Property: {
    Id: 'id',
    Password: 'password'
  },
  Type: {
    IsNotUUID: 'isNotUUID',
    IsWrongPassword: 'isWrongPassword',
  }
};

export const HTTP_ERR_MSGS = {
  400: 'BAD REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  500: 'INTERNAL ERROR',
};

export const HTTP_ERR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};
