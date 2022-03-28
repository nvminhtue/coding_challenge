import { createNamespace, Namespace } from 'cls-hooked';
import { IncomingMessage } from 'http';
import { v4 } from 'uuid';

export class CurrentContext {
  public static session: Namespace = createNamespace(v4());
  public readonly id: string;
  public request: IncomingMessage;
  public response: Response;

  constructor(request: IncomingMessage, response: Response) {
    this.id = v4();
    this.request = request;
    this.response = response;
  }

  public static middleware(req, res, next) {
    const session = CurrentContext.session;
    const currentContext = new CurrentContext(req, res);

    session.run(() => {
      session.bindEmitter(req);
      session.bindEmitter(res);
      session.set(CurrentContext.name, currentContext);
      next();
    });
  }

  public static getId(): string {
    return this.session.get(CurrentContext.name) && this.session.get(CurrentContext.name).id;
  }
}
