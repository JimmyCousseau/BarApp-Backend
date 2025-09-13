import { CanActivate, ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import { LoginService } from '../../api/login/login.service';
import { isTokenExpired } from '../../utils/TimeGestion';

@Injectable()
export class AuthGuard implements CanActivate {

  logger: Logger = new Logger('AuthGuard')

  constructor(
    @Inject(LoginService)
    private readonly loginService: LoginService,
  ) {

  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = (await this.loginService.getToken(request.headers.authorization, request.headers.username))
    const canActivate = token !== null && !isTokenExpired(token)
    this.logger.log(`canActivate: ${canActivate}`)

    if (!canActivate) {
      this.logger.log(`token: ${token?.token}`)
      this.logger.log(`is token expired: ${isTokenExpired(token)}`)
    }
    return canActivate
  }
}
