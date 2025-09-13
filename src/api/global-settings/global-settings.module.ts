import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalSettings } from '../../entities/GlobalSettings';
import { LoginModule } from '../login/login.module';
import { RoleModule } from '../role/role.module';
import { GlobalSettingsController } from './global-settings.controller';
import { GlobalSettingsService } from './global-settings.service';

@Module({
  imports: [TypeOrmModule.forFeature([GlobalSettings]), RoleModule, LoginModule],
  exports: [TypeOrmModule],
  providers: [GlobalSettingsService],
  controllers: [GlobalSettingsController],
})
export class GlobalSettingsModule { }
