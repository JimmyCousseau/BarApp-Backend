import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Orders } from '../../entities/Orders';
import { HistoryService } from '../../api/history/history.service';

describe('HistoryService', () => {
  let service: HistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Orders],
      providers: [
        HistoryService,
        {
          provide: getRepositoryToken(Orders),
          useValue: {
            createQueryBuilder: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<HistoryService>(HistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
