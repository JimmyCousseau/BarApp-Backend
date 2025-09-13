import { Body, Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { Accounts } from '../../entities/Accounts';
import { AuthGuard } from '../../security/guards/auth.guard';
import { comparePassword } from '../../utils/bcrypt';
import { isTokenExpired } from '../../utils/TimeGestion';
import { RoleService } from '../role/role.service';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(
        private loginService: LoginService,
        private roleService: RoleService,
    ) { }

    @Post()
    async login(@Body('username') username: string, @Body('password') password: string): Promise<any> {
        const userDB = await this.loginService.getUser(username);
        if (userDB === null || !comparePassword(password, userDB.password))
            return null

        let token: string = await this.loginService.userHasToken(username)
            ? await this.loginService.updateToken(username)
            : await this.loginService.registerToken(username)

        return {
            user: userDB,
            token: token,
            role: await this.roleService.findOneBy(userDB.role)
        };
    }

    @Post('verifyToken')
    async verifyToken(@Body('username') username: string, @Body('token') token: string): Promise<any> {
        const foundToken = await this.loginService.getToken(token, username)
        if (foundToken === null || isTokenExpired(foundToken))
            return null;

        const user = await this.loginService.getUser(username)
        return {
            user: user,
            role: await this.roleService.findOneBy(user.role)
        };
    }

    @Post('verifyIdentification')
    async verifyIdentification(@Body('user') user: Accounts): Promise<boolean> {
        const userDB = await this.loginService.getUser(user.username)
        return userDB !== null && comparePassword(user.password, userDB.password)
    }

    @Delete('disconnect/:username')
    @UseGuards(AuthGuard)
    async disconnect(@Param('username') username: string): Promise<boolean> {
        return await this.loginService.deleteToken(username)
    }
}
