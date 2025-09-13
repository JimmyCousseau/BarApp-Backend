import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Roles } from '../../entities/Roles';
import { SecurityChecker } from '../../utils/SecurityChecker';
import { RoleController } from '../../api/role/role.controller';
import { RoleService } from '../../api/role/role.service';

describe('RoleController', () => {
  let roleController: RoleController;
  let roleService: RoleService;
  let securityChecker: SecurityChecker;

  const adminUser = { username: 'jimmy', password: 'hey', role: 'admin' }

  const result: Roles[] = [
    {
      role: 'admin',
      access_administration_panel: true,
      access_checkout: true,
      access_kitchen: true,
      access_history: true,
      access_menu: true,
      access_orders: true,
      access_statistics: true,
      modify_map: true,
      modify_menu: true,
    }, {
      role: 'user',
      access_administration_panel: false,
      access_checkout: false,
      access_kitchen: false,
      access_history: false,
      access_menu: true,
      access_orders: true,
      access_statistics: false,
      modify_map: false,
      modify_menu: false,
    }];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleController],
      providers: [
        RoleService,
        SecurityChecker,
        {
          provide: getRepositoryToken(Roles),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            insert: jest.fn(),
            update: jest.fn(),
          }
        }
      ],
    }).compile();

    roleService = module.get<RoleService>(RoleService);
    securityChecker = module.get<SecurityChecker>(SecurityChecker);
    roleController = module.get<RoleController>(RoleController);
  });

  it('should be defined', () => {
    expect(roleService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      jest.spyOn(roleService, 'findAll').mockImplementation(async () => result);

      expect(await roleController.findAll()).toBe(result);
    });
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const roleName = 'moderator';
      const result = { role: roleName };
      jest.spyOn(roleService, 'create').mockImplementation(async () => result);

      expect(await roleController.insert(roleName)).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a role', async () => {
      const role = 'moderator';
      jest.spyOn(securityChecker, 'isUserValid').mockImplementation(async () => true);
      jest.spyOn(roleService, 'remove').mockImplementation(async () => true);

      expect(await roleController.delete(role)).toBe(true);
    });

    it('should return null if user is not valid', async () => {
      const role = 'moderator';
      jest.spyOn(securityChecker, 'isUserValid').mockImplementation(async () => false);

      expect(await roleController.delete(role)).toBe(null);
    });
  });

})
