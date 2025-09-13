import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Orders } from '../../entities/Orders';
import { Products } from '../../entities/Products';
import { Sections } from '../../entities/Sections';
import { MenuService } from '../../api/menu/menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuService,
        {
          provide: getRepositoryToken(Sections),
          useValue: {
            find: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(Products),
          useValue: {
            find: jest.fn(),
          }
        },
        {
          provide: getRepositoryToken(Orders),
          useValue: {
            createQueryBuilder: jest.fn(),
          }
        }
      ],
    }).compile();

    service = module.get<MenuService>(MenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
