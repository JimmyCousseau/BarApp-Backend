import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from '../../entities/Accounts';
import { AuthTokens } from '../../entities/AuthTokens';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
    imports: [
        JwtModule.register({ secret: process.env.JWT_SECRET }),
        TypeOrmModule.forFeature([Accounts, AuthTokens]),
        forwardRef(() => RoleModule),
    ],
    exports: [TypeOrmModule, LoginService],
    providers: [LoginService, RoleService],
    controllers: [LoginController],
})
export class LoginModule { }
