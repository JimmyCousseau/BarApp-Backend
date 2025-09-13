import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { Permission } from '../../entities/Roles';
import { Perm } from '../../security/decorators';
import { AuthGuard } from '../../security/guards/auth.guard';
import { PermissionGuard } from '../../security/guards/permission.guard';
import { GlobalSettingsService } from './global-settings.service';

@Controller('global-settings')
@UseGuards(PermissionGuard, AuthGuard)
export class GlobalSettingsController {

    constructor(
        private globalSettingsService: GlobalSettingsService,
    ) {

    }

    // TODO How to manage the permission for the findOneBy ? Because there's the map in this table and other stuff about parameters
    @Get(':id')
    async findOneBy(@Param('id') parameterID: string): Promise<string> {
        return this.globalSettingsService.findOneBy(parameterID);
    }

    @Patch(':id')
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL, Permission.MODIFY_MAP)
    async upsert(@Param('id') id, @Body('value') value: string): Promise<boolean> {
        return await this.globalSettingsService.findOneBy(id)
            ? await this.globalSettingsService.update(id, value)
            : await this.globalSettingsService.insert(id, value)
    }
}
