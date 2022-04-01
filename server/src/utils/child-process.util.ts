import { promisify } from 'util';

export function execute(func, command: string): Promise<any> {
  return promisify(func)(command);
}
