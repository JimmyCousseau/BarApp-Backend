import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Orders } from '../../entities/Orders';
import { Permission } from '../../entities/Roles';
import { Perm } from '../../security/decorators';
import { AuthGuard } from '../../security/guards/auth.guard';
import { PermissionGuard } from '../../security/guards/permission.guard';
import { ProductsService } from '../products/products.service';
import { OrderService } from './order.service';
import { ObjectId } from 'typeorm';

@Controller('order')
@UseGuards(AuthGuard, PermissionGuard)
export class OrderController {

    logger: Logger = new Logger('OrderController')

    constructor(
        private readonly orderService: OrderService,
        private readonly productsService: ProductsService,
    ) { }

    @Get()
    @Perm(Permission.ACCESS_ORDERS)
    async findAll(): Promise<Orders[]> {
        return await this.orderService.findAll();
    }

    @Get('pending')
    @Perm(Permission.ACCESS_ORDERS)
    async findAllPending(): Promise<Orders[]> {
        return await this.orderService.findAllPending();
    }

    @Get('waiting-paiement')
    @Perm(Permission.ACCESS_CHECKOUT)
    async findAllWaitingPaiement(): Promise<Orders[]> {
        return await this.orderService.findAllWaitingPaiement();
    }

    @Get('being-prepared')
    @Perm(Permission.ACCESS_KITCHEN)
    async findAllBeingPrepared(): Promise<Orders[]> {
        return await this.orderService.findAllBeingPrepared()
    }

    @Post(':need_preparation')
    @Perm(Permission.ACCESS_MENU)
    async insert(@Param('need_preparation') need_preparation: string, @Body() order: Orders): Promise<boolean> {
        return await this.orderService.insert(need_preparation, order);
    }

    @Delete(':id')
    @Perm(Permission.ACCESS_ORDERS)
    async delete(@Param('id') id: ObjectId): Promise<any> {
        return await this.orderService.delete(id);
    }

    @Patch()
    @Perm(Permission.ACCESS_ORDERS)
    async update(@Body() order: Orders): Promise<any> {
        return await this.orderService.update(order)
    }

    @Patch('waiting-paiement-state')
    @Perm(Permission.ACCESS_ORDERS)
    async updateStateServed(@Body('order') order: Orders): Promise<any> {
        await this.updateAmountProduct(order)
        return await this.orderService.updateStateServed(order)
    }

    @Patch('paid-state')
    @Perm(Permission.ACCESS_CHECKOUT)
    async updateStatePaid(@Body('table_id') table_id: number): Promise<any> {
        return await this.orderService.updateStatePaid(table_id);
    }

    @Patch('prepared-state')
    @Perm(Permission.ACCESS_KITCHEN)
    async updateStatePrepared(@Body('order') order: Orders): Promise<any> {
        return await this.orderService.updateStatePrepared(order)
    }

    private async updateAmountProduct(order: Orders): Promise<any> {
        return await this.productsService.updateAmount(order.name, order.amount)
    }
}
