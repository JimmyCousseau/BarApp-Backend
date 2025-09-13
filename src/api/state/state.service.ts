import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { States } from '../../entities/States';

@Injectable()
export class StateService {

    constructor(
        @InjectRepository(States)
        private readonly repo: Repository<States>,
    ) {

    }

    async findAll(): Promise<States[]> {
        return this.repo.find();
    }
}
