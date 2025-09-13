import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { Accounts } from '../../entities/Accounts';
import { Permission } from '../../entities/Roles';
import { Perm } from '../../security/decorators';
import { AuthGuard } from '../../security/guards/auth.guard';
import { PermissionGuard } from '../../security/guards/permission.guard';
import { LoggingInterceptor } from '../../security/interceptors/logging.interceptor';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard, PermissionGuard)
export class UserController {

    constructor(
        private readonly userService: UserService
    ) {

    }

    @Get()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async findAll(): Promise<Accounts[]> {
        return await this.userService.findAll()
    }

    @Post()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async insert(@Body('user') user: Accounts): Promise<boolean> {
        return await this.userService.insert(user)
    }

    @Delete(':user')
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async delete(@Param('user') user: string): Promise<boolean> {
        return await this.userService.delete(user)
    }

    @Patch('update-password')
    async updatePassword(@Body('user') user: Accounts, @Body('passwd') password: string): Promise<boolean> {
        return await this.userService.updatePassword(user, password)
    }

    @Patch('update-role')
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async updateRole(@Body('user') user: Accounts): Promise<boolean> {
        return await this.userService.updateRole(user)
    }
}
