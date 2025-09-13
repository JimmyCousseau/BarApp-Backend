import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BasicProducts } from 'src/entities/BasicProducts';
import { DataSource, MongoRepository, ObjectId } from 'typeorm';

@Injectable()
export class BasicProductsService {

    repo: MongoRepository<BasicProducts>
    constructor(
        @InjectDataSource()
        private readonly dataSource: DataSource,
    ) {
        this.repo = this.dataSource.getMongoRepository(BasicProducts)
    }

    async findAll(): Promise<BasicProducts[]> {
        return this.repo.find()
    }

    private async findOneBy(product_id: ObjectId): Promise<BasicProducts> {
        return this.repo.findOneBy({
            _id: product_id,
        })
    }

    async insert(basicProducts: BasicProducts): Promise<any> {
        return this.repo.insert({
            name: basicProducts.name,
            amount: basicProducts.amount,
        })
    }

    async update(basicProducts: BasicProducts): Promise<any> {
        return this.repo.update({
            _id: basicProducts._id,
        }, {
            name: basicProducts.name,
            amount: basicProducts.amount,
        })
    }

    async updateAmount(product_id: ObjectId, amount: number): Promise<any> {
        const basicProduct = await this.findOneBy(product_id)
        return await this.repo.update({
            _id: product_id,
        }, {
            amount: basicProduct.amount - amount,
        })
    }

    async delete(product_id: ObjectId): Promise<any> {
        return this.repo.delete({
            _id: product_id,
        })
    }
}
