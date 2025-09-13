import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CacheInterceptor, CACHE_KEY_METADATA } from '@nestjs/cache-manager';


@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {

  constructor(protected readonly cacheManager: any, protected readonly reflector: Reflector) {
    super(cacheManager, reflector)
  }

  trackBy(context: ExecutionContext): string | undefined {
    const cacheKey = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );
    const logger = new Logger('HttpInterceptor')
    if (cacheKey) {
      const request = context.switchToHttp().getRequest();
      const msg = `${cacheKey}-${request._parsedUrl.query}`
      logger.log(msg)
      return msg
    }

    return super.trackBy(context);
  }
}
