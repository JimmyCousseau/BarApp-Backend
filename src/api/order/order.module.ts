import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from '../../entities/Orders';
import { LoginModule } from '../login/login.module';
import { ProductsModule } from '../products/products.module';
import { RoleModule } from '../role/role.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Orders]),
        ProductsModule,
        LoginModule,
        RoleModule
    ],
    exports: [TypeOrmModule],
    providers: [OrderService],
    controllers: [OrderController],
})
export class OrderModule { }
