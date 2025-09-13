import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalSettings } from '../../entities/GlobalSettings';
import { Repository } from 'typeorm';

@Injectable()
export class GlobalSettingsService {

    constructor(
        @InjectRepository(GlobalSettings)
        private readonly globalRepo: Repository<GlobalSettings>,
    ) {

    }

    async findOneBy(parameterID: string): Promise<string> {
        const result = await this.globalRepo.findOneBy({ parameter_id: parameterID })
        if (result !== null)
            return result.value
        return null
    }

    async insert(id: string, value: string): Promise<any> {
        return this.globalRepo.create({
            parameter_id: id,
            value: value,
        })
    }

    async update(id: string, value: string): Promise<any> {
        return await this.globalRepo.update({
            parameter_id: id,
        }, {
            value: value,
        })
    }
}
