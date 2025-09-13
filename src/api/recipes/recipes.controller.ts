import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Recipes } from 'src/entities/Recipes';
import { Permission } from 'src/entities/Roles';
import { Perm } from 'src/security/decorators';
import { AuthGuard } from 'src/security/guards/auth.guard';
import { PermissionGuard } from 'src/security/guards/permission.guard';
import { RecipesService } from './recipes.service';
import { ObjectId } from 'typeorm';

@Controller('recipes')
@UseGuards(AuthGuard, PermissionGuard)
export class RecipesController {

    constructor(
        private readonly recipesService: RecipesService,
    ) {

    }

    @Get(':product_id')
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async findManyBy(@Param('product_id') productID: ObjectId): Promise<Recipes[]> {
        return this.recipesService.findManyBy(productID)
    }

    @Post()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async insert(@Body('recipe') recipe: Recipes): Promise<any> {
        return this.recipesService.insert(recipe)
    }

    @Post('upsert')
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async upsert(@Body('recipe') recipe: Recipes): Promise<any> {
        return await this.recipesService.findOneBy(recipe)
            ? await this.recipesService.update(recipe)
            : await this.recipesService.insert(recipe)
    }

    @Patch()
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async update(@Body('recipe') recipe: Recipes): Promise<any> {
        this.recipesService.update(recipe)
    }

    @Delete(':product-id/:basic-product-id')
    @Perm(Permission.ACCESS_ADMINISTRATION_PANEL)
    async delete(@Param('product-id') productID: ObjectId, @Param('basic-product-id') basicProductID: ObjectId): Promise<any> {
        return this.recipesService.delete(productID, basicProductID)
    }

}
