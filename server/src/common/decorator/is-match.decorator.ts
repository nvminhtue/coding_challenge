import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsMatch(regex: RegExp, nullable = false, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isMatch',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any, _args: ValidationArguments) {
          return nullable && !value ? true : regex.test(value);
        },
      },
    });
  };
}
