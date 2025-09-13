import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Products } from 'src/entities/Products';
import { LoginModule } from '../login/login.module';
import { RecipesController } from '../recipes/recipes.controller';
import { RecipesModule } from '../recipes/recipes.module';
import { RoleModule } from '../role/role.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Products]),
    RecipesModule,
    LoginModule,
    RoleModule
  ],
  exports: [TypeOrmModule, ProductsService],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule { }
