import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Accounts } from '../../entities/Accounts';
import { encodePassword } from '../../utils/bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Accounts)
        private readonly userRepo: Repository<Accounts>,
    ) {

    }

    async findAll(): Promise<Accounts[]> {
        return await this.userRepo.find({
            select: {
                username: true,
                role: true,
            }
        })
    }

    async findAllByRole(role: string): Promise<Accounts[]> {
        return await this.userRepo.find({
            select: {
                username: true,
                role: true,
            },
            where: {
                role: role,
            }
        });
    }

    async insert(user: Accounts): Promise<any> {
        return await this.userRepo.insert({
            username: user.username,
            role: user.role,
            password: encodePassword('changetonmdp')
        })
    }

    async delete(username: string): Promise<any> {
        return await this.userRepo.delete({
            username: username,
        })
    }

    async updatePassword(user: Accounts, password: string): Promise<any> {
        const newPasswordHash = encodePassword(password);
        return await this.userRepo.update({
            username: user.username,
            role: user.role,
        }, {
            password: newPasswordHash
        })
    }

    async updateRole(user: Accounts): Promise<any> {
        return await this.userRepo.update({
            username: user.username,
        }, {
            role: user.role
        })
    }
}
