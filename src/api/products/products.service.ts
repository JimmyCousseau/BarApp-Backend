import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/Products';
import { Repository } from 'typeorm';
import { RecipesService } from '../recipes/recipes.service';

@Injectable()
export class ProductsService {

    constructor(
        @InjectRepository(Products)
        private readonly repo: Repository<Products>,
        private readonly recipesService: RecipesService,
    ) {

    }

    async findAll(): Promise<Products[]> {
        return await this.repo.find();
    }

    async findOneByName(name: string): Promise<Products> {
        return await this.repo.findOneBy({
            name: name,
        });
    }

    async delete(product: string): Promise<any> {
        return await this.repo.delete({ name: product });
    }

    async update(product: Products): Promise<any> {
        return await this.repo.update({
            _id: product._id
        }, {
            name: product.name,
            price_bought: product.price_bought,
            price_sold: product.price_sold,
            section: product.section,
            amount: product.amount,
            need_preparation: product.need_preparation,
        })
    }

    async updateAmount(productName: string, amount: number): Promise<any> {
        if (amount === -1) {
            return await this.recipesService.updateBasicProductAmount(
                (await this.findOneByName(productName))._id,
                amount
            )
        }
        const prod = await this.repo.findOneBy({ name: productName })
        const nextAmount = prod.amount - amount
        return await this.repo.update({
            name: productName,
        }, {
            amount: (nextAmount >= 0 ? nextAmount : 0),
        })
    }

    async insert(product: Products): Promise<any> {
        return await this.repo.insert({
            name: product.name,
            price_bought: product.price_bought,
            price_sold: product.price_sold,
            section: product.section,
            amount: product.amount,
            need_preparation: product.need_preparation,
        })
    }
}
