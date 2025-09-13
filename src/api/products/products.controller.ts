import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { Products } from 'src/entities/Products';
import { Permission } from 'src/entities/Roles';
import { Perm } from 'src/security/decorators';
import { AuthGuard } from 'src/security/guards/auth.guard';
import { PermissionGuard } from 'src/security/guards/permission.guard';
import { LoggingInterceptor } from 'src/security/interceptors/logging.interceptor';
import { ProductsService } from './products.service';

@Controller('products')
@UseInterceptors(LoggingInterceptor)
@UseGuards(AuthGuard, PermissionGuard)
export class ProductsController {

    constructor(
        private productService: ProductsService,
    ) {

    }

    @Get()
    @Perm(Permission.ACCESS_MENU)
    async findAll(): Promise<Products[]> {
        return this.productService.findAll();
    }

    @Delete(':product-name')
    @Perm(Permission.MODIFY_MENU)
    async delete(@Param('product-name') product: string): Promise<boolean> {
        return this.productService.delete(product)
    }

    @Patch()
    @Perm(Permission.MODIFY_MENU)
    async update(@Body('product') product: Products): Promise<boolean> {
        return this.productService.update(product)
    }

    @Post()
    @Perm(Permission.MODIFY_MENU)
    async insert(@Body('product') product: Products): Promise<boolean> {
        return await this.productService.insert(product)
    }

}
