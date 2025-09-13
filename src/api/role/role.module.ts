import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../../entities/Roles';
import { LoginModule } from '../login/login.module';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  controllers: [RoleController],
  providers: [RoleService],
  imports: [
    TypeOrmModule.forFeature([Roles]),
    forwardRef(() => LoginModule),
  ],
  exports: [TypeOrmModule, RoleService],
})
export class RoleModule { }
