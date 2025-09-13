import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipes } from 'src/entities/Recipes';
import { ObjectId, Repository } from 'typeorm';
import { BasicProductsService } from '../basic-products/basic-products.service';

@Injectable()
export class RecipesService {

    constructor(
        @InjectRepository(Recipes)
        private readonly repo: Repository<Recipes>,
        private readonly basicProductsService: BasicProductsService,
    ) {

    }

    async insert(recipes: Recipes): Promise<any> {
        return this.repo.insert(recipes)
    }

    async findOneBy(recipe: Recipes): Promise<any> {
        return this.repo.findOneBy({
            product_id: recipe.product_id,
            basic_product_id: recipe.basic_product_id,
        })
    }

    async findManyBy(product_id: ObjectId): Promise<Recipes[]> {
        return this.repo.find({
            where: {
                product_id: product_id,
            }
        })
    }

    async update(recipe: Recipes): Promise<any> {
        return this.repo.update({
            product_id: recipe.product_id,
            basic_product_id: recipe.basic_product_id,
        }, {
            amountUsed: recipe.amountUsed,
        })
    }

    async updateBasicProductAmount(product_id: ObjectId, amount: number): Promise<any> {
        const recipes = await this.findManyBy(product_id)
        for (const recipe of recipes) {
            await this.basicProductsService.updateAmount(product_id, recipe.amountUsed * amount)
        }
    }

    async delete(productID: ObjectId, basicProductID: ObjectId): Promise<any> {
        return this.repo.delete({
            product_id: productID,
            basic_product_id: basicProductID,
        })
    }
}
