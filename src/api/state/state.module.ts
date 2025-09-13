import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { States } from '../../entities/States';
import { LoginModule } from '../login/login.module';
import { RoleModule } from '../role/role.module';
import { StateController } from './state.controller';
import { StateService } from './state.service';

@Module({
    imports: [TypeOrmModule.forFeature([States]), RoleModule, LoginModule],
    exports: [TypeOrmModule],
    providers: [StateService],
    controllers: [StateController],
})
export class StateModule { }
