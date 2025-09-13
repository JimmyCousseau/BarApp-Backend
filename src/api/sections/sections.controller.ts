import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Permission } from '../../entities/Roles';
import { Sections } from '../../entities/Sections';
import { Perm } from '../../security/decorators';
import { AuthGuard } from '../../security/guards/auth.guard';
import { PermissionGuard } from '../../security/guards/permission.guard';
import { SectionsService } from './sections.service';

@Controller('sections')
@UseGuards(AuthGuard, PermissionGuard)
export class SectionsController {

    logger: Logger = new Logger('SectionsController')

    constructor(
        private readonly sectionsService: SectionsService,
    ) {
    }

    @Get()
    @Perm(Permission.ACCESS_MENU)
    async findAll(): Promise<Sections[]> {
        return this.sectionsService.findAll();
    }

    @Delete(':id')
    @Perm(Permission.MODIFY_MENU)
    async delete(@Param('id') id: number): Promise<boolean> {
        return this.sectionsService.delete(id)
    }

    @Patch()
    @Perm(Permission.MODIFY_MENU)
    async update(@Body('section') section: Sections): Promise<boolean> {
        this.logger.log(`update ${JSON.stringify(section)}`)
        return this.sectionsService.update(section)
    }

    @Post()
    @Perm(Permission.MODIFY_MENU)
    async insert(@Body('section') section: Sections): Promise<boolean> {
        this.logger.log(`insert ${JSON.stringify(section)}`)
        return await this.sectionsService.insert(section)
    }
}
