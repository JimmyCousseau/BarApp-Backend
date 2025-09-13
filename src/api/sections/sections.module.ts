import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sections } from '../../entities/Sections';
import { LoginModule } from '../login/login.module';
import { RoleModule } from '../role/role.module';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sections]), RoleModule, LoginModule],
  exports: [TypeOrmModule],
  providers: [SectionsService],
  controllers: [SectionsController],
})
export class SectionsModule { }
