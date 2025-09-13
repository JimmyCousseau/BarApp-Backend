import { Test, TestingModule } from '@nestjs/testing';
import { LoginController } from '../../api/login/login.controller';
import { LoginService } from '../../api/login/login.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('LoginController', () => {
  let controller: LoginController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
    }).useMocker((token) => {
      const results = [
        { Username: 'Jimmy', Role: 'Administrateur', Password: '123456'},
        { Username: 'Fred', Role: 'Serveur', Password: '75421' },
      ];
      if (token === LoginService) {
        return { createQueryBuilder: jest.fn().mockResolvedValue(results) };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
      .compile();

    controller = module.get<LoginController>(LoginController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
