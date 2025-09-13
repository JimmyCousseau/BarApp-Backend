import { Test, TestingModule } from '@nestjs/testing';
import { BasicProductsService } from '../../api/basic-products/basic-products.service';

describe('BasicProductsService', () => {
  let service: BasicProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BasicProductsService],
    }).compile();

    service = module.get<BasicProductsService>(BasicProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
