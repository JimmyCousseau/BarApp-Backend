import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { Accounts } from '../../entities/Accounts';
import { AuthTokens } from '../../entities/AuthTokens';
import { getActualTimeInMinutes, hoursToMinutes } from '../../utils/TimeGestion';

@Injectable()
export class LoginService {

    private readonly EXPIRATION_TOKEN = hoursToMinutes(5)

    constructor(
        @InjectRepository(Accounts)
        private readonly accountsRepo: Repository<Accounts>,
        @InjectRepository(AuthTokens)
        private readonly authToken: Repository<AuthTokens>,
    ) { }

    async getUser(username: string): Promise<Accounts> {
        return await this.accountsRepo.findOne({
            select: {
                password: false,
            },
            where: {
                username: username,
            }
        });
    }

    async getToken(token: string, username: string): Promise<AuthTokens> {
        return await this.authToken.findOneBy({ uid: username, token: token });
    }

    async userHasToken(username: string): Promise<boolean> {
        return await this.authToken.findOneBy({ uid: username }) !== null;
    }

    async updateToken(username: string): Promise<string> {
        const payload = { username: username };
        const token = sign(payload, process.env.JWT_KEY);

        await this.authToken.update({
            uid: username,
        }, {
            token: token,
            expiration_date: getActualTimeInMinutes() + this.EXPIRATION_TOKEN,
        })
        return token;
    }

    async registerToken(username: string): Promise<string> {
        const payload = { username: username };
        const token = sign(payload, process.env.JWT_KEY);

        await this.authToken.insert({
            uid: username, token: token,
            expiration_date: getActualTimeInMinutes() + this.EXPIRATION_TOKEN
        });
        return token;
    }

    async deleteToken(username: string): Promise<any> {
        return this.authToken.delete({
            uid: username,
        })
    }
}
