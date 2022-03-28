import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ErrorDTO {
  @Expose()
  readonly entity: string = null;

  @Expose()
  readonly property: string = null;

  @Expose()
  readonly code: number;

  @Expose()
  readonly message: string;
}
