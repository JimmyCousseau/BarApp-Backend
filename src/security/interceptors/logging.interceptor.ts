import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

  logger: Logger = new Logger('LoggingInterceptor')

  constructor(
  ) {

  }

  // TODO: Add logging 
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		this.logger.log(`handler: ${context.getHandler()}`)
    return next.handle()
  }
}
