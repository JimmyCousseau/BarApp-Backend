import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Labels } from '../../entities/Labels';
import { LoginModule } from '../login/login.module';
import { RoleModule } from '../role/role.module';
import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';

@Module({
    imports: [TypeOrmModule.forFeature([Labels]), RoleModule, LoginModule],
    exports: [TypeOrmModule],
    providers: [LabelsService],
    controllers: [LabelsController],
})
export class LabelsModule { }
