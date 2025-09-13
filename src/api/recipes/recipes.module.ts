import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipes } from 'src/entities/Recipes';
import { BasicProductsModule } from '../basic-products/basic-products.module';
import { LoginModule } from '../login/login.module';
import { RoleModule } from '../role/role.module';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Recipes]),
    LoginModule,
    RoleModule,
    BasicProductsModule,
  ],
  exports: [TypeOrmModule, RecipesService],
  providers: [RecipesService],
  controllers: [RecipesController],
})
export class RecipesModule { }
