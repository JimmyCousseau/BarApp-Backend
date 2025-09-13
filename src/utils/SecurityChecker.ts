import { Accounts } from "../entities/Accounts";
import { Repository } from "typeorm";
import { comparePassword } from "./bcrypt";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SecurityChecker {
    constructor(
        @InjectRepository(Accounts)
        private accountRepo: Repository<Accounts>,
    ) { }

    async isUserValid(user: Accounts): Promise<boolean> {
        const userFound = await this.accountRepo.findOneBy({ username: user.username });
        if (!comparePassword(user.password, userFound.password))
            return false;
        return userFound === null ? false : true;
    }

    async hasAccess(user: Accounts, autorization: string): Promise<boolean> {
        // const userFound = await this.accountRepo.findOneBy(
        //     {
        //         username: Username,
        //         role: roleToVerify,
        //     }
        // );
        // return userFound === null ? false : true;
        return true
    }
}
