import { Test, TestingModule } from '@nestjs/testing';
import { BasicProductsController } from '../../api/basic-products/basic-products.controller';

describe('BasicProductsController', () => {
  let controller: BasicProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BasicProductsController],
    }).compile();

    controller = module.get<BasicProductsController>(BasicProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
