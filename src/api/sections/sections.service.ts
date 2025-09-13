import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sections } from '../../entities/Sections';
import { Repository } from 'typeorm';

@Injectable()
export class SectionsService {

    constructor(
        @InjectRepository(Sections)
        private readonly sectionRepo: Repository<Sections>
    ) {

    }

    async findAll(): Promise<Sections[]> {
        return await this.sectionRepo.find();
    }

    async delete(id: number): Promise<any> {
        return await this.sectionRepo.delete({ _id: id });
    }

    async update(section: Sections): Promise<any> {
        return await this.sectionRepo.update({  
            _id: section._id,
        }, {
            current_section: section.current_section,
            parent_section: section.parent_section,
        })
    }

    async insert(section: Sections): Promise<any> {
        return await this.sectionRepo.insert({
            current_section: section.current_section,
            parent_section: section.parent_section,
        })
    }
}
