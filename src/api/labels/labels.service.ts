import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Labels } from '../../entities/Labels';
import { ObjectId, Repository } from 'typeorm';

@Injectable()
export class LabelsService {

    constructor(
        @InjectRepository(Labels)
        private readonly labelRepo: Repository<Labels>
    ) {

    }

    async findAll(): Promise<Labels[]> {
        return this.labelRepo.find()
    }

    async insert(labels: Labels): Promise<any> {
        return this.labelRepo.insert({
            label: labels.label
        })
    }

    async update(labels: Labels): Promise<any> {
        return this.labelRepo.update({
            _id: labels._id,
        }, {
            label: labels.label
        })
    }

    async delete(id: ObjectId): Promise<any> {
        return this.labelRepo.delete({ _id: id })
    }
}
