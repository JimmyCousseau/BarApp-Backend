import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { BasicProducts } from 'src/entities/BasicProducts';
import { Permission } from 'src/entities/Roles';
import { Perm } from 'src/security/decorators';
import { AuthGuard } from 'src/security/guards/auth.guard';
import { PermissionGuard } from 'src/security/guards/permission.guard';
import { BasicProductsService } from './basic-products.service';
import { ObjectId } from 'typeorm';

@Controller('basic-products')
@UseGuards(AuthGuard, PermissionGuard)
export class BasicProductsController {

    constructor(
        private readonly basicProductsService: BasicProductsService,
    ) {

    }

    @Get()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL, Permission.MODIFY_MENU)
    async findAll(): Promise<BasicProducts[]> {
        return this.basicProductsService.findAll()
    }

    @Post()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL, Permission.MODIFY_MENU)
    async insert(@Body('basicProduct') basicProduct: BasicProducts): Promise<any> {
        return this.basicProductsService.insert(basicProduct)
    }

    @Patch()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL, Permission.MODIFY_MENU)
    async update(@Body('basicProduct') basicProduct: BasicProducts): Promise<any> {
        return this.basicProductsService.update(basicProduct)
    }

    @Delete(':id')
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL, Permission.MODIFY_MENU)
    async delete(@Param('id') id: ObjectId): Promise<any> {
        return this.basicProductsService.delete(id)
    }

}
