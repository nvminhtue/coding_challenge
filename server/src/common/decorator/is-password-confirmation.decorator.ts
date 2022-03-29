import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsPasswordConfirmation(refName: string, validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isPasswordConfirmation',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(_value: any, args: ValidationArguments) {
          return args.object[refName] === args.object[propertyName];
        },
      },
    });
  };
}
