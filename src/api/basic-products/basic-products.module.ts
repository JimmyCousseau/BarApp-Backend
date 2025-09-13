import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BasicProducts } from 'src/entities/BasicProducts';
import { LoginModule } from '../login/login.module';
import { RoleModule } from '../role/role.module';
import { BasicProductsController } from './basic-products.controller';
import { BasicProductsService } from './basic-products.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([BasicProducts]),
        LoginModule,
        RoleModule,
    ],
    exports: [TypeOrmModule, BasicProductsService],
    providers: [BasicProductsService],
    controllers: [BasicProductsController],
})
export class BasicProductsModule { }
