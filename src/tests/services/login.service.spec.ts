import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppService } from '../../app.service';
import { DataLogs } from '../../entities/DataLogs';
import { Accounts } from '../../entities/Accounts';
import { LoginService } from '../../api/login/login.service';

describe('LoginService', () => {
  let service: LoginService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: getRepositoryToken(Accounts),
          useValue: {
            findOneBy: jest.fn(),
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
      ]
      ,
    }).compile();

    service = module.get<LoginService>(LoginService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
