import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Permission, Roles } from '../../entities/Roles';
import { Perm } from '../../security/decorators';
import { AuthGuard } from '../../security/guards/auth.guard';
import { PermissionGuard } from '../../security/guards/permission.guard';
import { RoleService } from './role.service';

@Controller('role')
@UseGuards(PermissionGuard, AuthGuard)
export class RoleController {

    constructor(
        private roleService: RoleService,
    ) {

    }

    @Get()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async findAll(): Promise<Roles[]> {
        return await this.roleService.findAll();
    }

    @Post()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async insert(@Body('roleName') roleName: string): Promise<any> {
        return await this.roleService.insert(roleName);
    }

    @Delete(':roleName')
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async delete(@Param('roleName') role: string): Promise<any> {
        return await this.roleService.delete(role);
    }

    @Patch()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async update(@Body('role') role: Roles): Promise<any> {
        return await this.roleService.update(role)
    }
}
