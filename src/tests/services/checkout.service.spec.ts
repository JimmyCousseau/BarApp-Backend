import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataLogs } from '../../entities/DataLogs';
import { Repository } from 'typeorm';
import { AppService } from '../../app.service';
import { Orders } from '../../entities/Orders';
import { Products } from '../../entities/Products';
import { CheckoutService } from '../../api/checkout/checkout.service';

describe('CheckoutService', () => {
  let service: CheckoutService;
  let commandeRepo: Repository<Orders>;
  let dataLogRepo: Repository<DataLogs>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CheckoutService,
        {
          provide: getRepositoryToken(Orders),
          useValue: {
            createQueryBuilder: jest.fn(),
          }
        },
        AppService,
        {
          provide: getRepositoryToken(DataLogs),
          useValue: {
            createQueryBuilder: jest.fn(),
          }
        }
      ],
      imports: [
        Orders,
        Products,
      ]
    }).overrideProvider(Orders)
      .useValue(jest.fn())
      .compile();

    service = module.get<CheckoutService>(CheckoutService);
    commandeRepo = module.get<Repository<Orders>>(getRepositoryToken(Orders));
    dataLogRepo = module.get<Repository<DataLogs>>(getRepositoryToken(DataLogs));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('commandeRepo should be defined', () => {
    expect(commandeRepo).toBeDefined();
  })
  it('dataLogRepo should be defined', () => {
    expect(dataLogRepo).toBeDefined();
  })
});
