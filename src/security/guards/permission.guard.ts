import {
	CanActivate,
	ExecutionContext,
	Inject,
	Injectable,
	Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RoleService } from '../../api/role/role.service'

@Injectable()
export class PermissionGuard implements CanActivate {
	logger: Logger = new Logger('PermissionGuard')

	constructor(
		@Inject(RoleService)
		private readonly roleService: RoleService,
		private readonly reflector: Reflector
	) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const permissions = this.reflector.get<string[]>(
			'permissions',
			context.getHandler()
		)
		this.logger.log(`permissions needed: ${permissions}`)
		if (!permissions) return true

		const request = context.switchToHttp().getRequest()
		const role = JSON.parse(request.headers.role) // Petite faille de secu ici
		const rolebd = JSON.parse(
			JSON.stringify(await this.roleService.findOneBy(role['role']))
		)
		const isAccepted = permissions.some(
			(permission) => role[permission] && rolebd[permission]
		)
    this.logger.log(`is accepted: ${isAccepted}`)
    if (!isAccepted) {
      this.logger.log(`role of user: ${JSON.stringify(role)}`)
      this.logger.log(`role BD: ${JSON.stringify(rolebd)}`)
    }
		return isAccepted
	}
}
