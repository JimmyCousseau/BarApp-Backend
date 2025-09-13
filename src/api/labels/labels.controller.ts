import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PermissionGuard } from 'src/security/guards/permission.guard';
import { Labels } from '../../entities/Labels';
import { AuthGuard } from '../../security/guards/auth.guard';
import { LabelsService } from './labels.service';
import { ObjectId } from 'typeorm';

@Controller('labels')
@UseGuards(AuthGuard, PermissionGuard)
export class LabelsController {

    constructor(
        private readonly labelService: LabelsService
    ) {

    }

    @Get()
    async findAll(): Promise<Labels[]> {
        return this.labelService.findAll()
    }

    @Post()
    async insert(@Body('label') labels: Labels): Promise<any> {
        return this.labelService.insert(labels)
    }

    @Patch()
    async update(@Body('label') label: Labels): Promise<any> {
        return this.labelService.update(label)
    }

    @Delete(':id')
    async delete(@Param('id') id: ObjectId): Promise<any> {
        return this.labelService.delete(id)
    }
}
