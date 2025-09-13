import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from '../../entities/Roles';

@Injectable()
export class RoleService {

    constructor(
        @InjectRepository(Roles)
        private readonly roleRepo: Repository<Roles>
    ) {

    }

    async findAll(): Promise<Roles[]> {
        return await this.roleRepo.find();
    }

    async findOneBy(role_name: string): Promise<Roles> {
        return await this.roleRepo.findOneBy({ role: role_name });
    }

    async insert(role: string): Promise<any> {
        return await this.roleRepo.insert({
            role: role,
        })
    }

    async delete(role: string): Promise<any> {
        return await this.roleRepo.delete({
            role: role,
        })
    }

    async update(role: Roles): Promise<any> {
        return await this.roleRepo.update({
            role: role.role,
        }, role)
    }

}
