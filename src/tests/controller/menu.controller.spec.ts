import { Test, TestingModule } from '@nestjs/testing';
import { Products } from '../../entities/Products';
import { Sections } from '../../entities/Sections';
import { MenuController } from '../../api/menu/menu.controller';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';

const moduleMocker = new ModuleMocker(global);

describe('MenuController', () => {
  let controller: MenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuController],
    }).useMocker((token) => {
      const resultsAllSections = [
        { sectionCourante: 'Boissons', sectionParente: ''},
        { sectionCourante: 'Nourriture', sectionParente: '' },
        { sectionCourante: 'Pizzas', sectionParente: 'Nourriture' },
      ];
      const resultProducts = [
        { Intitule: 'Beer', Prix: 2.5, Section: 'Boissons' },
        { Intitule: '4 Fromages', Prix: 9.5, Section: 'Pizzas' },
        { Intitule: 'Voiture', Prix: 9830, Section: 'Voitures' },
      ];
      if (token === Sections) {
        return { find: jest.fn().mockResolvedValue(resultsAllSections) };
      }
      if (token === Products) {
        return { find: jest.fn().mockResolvedValue(resultProducts) };
      }
      if (typeof token === 'function') {
        const mockMetadata = moduleMocker.getMetadata(token) as MockFunctionMetadata<any, any>;
        const Mock = moduleMocker.generateFromMetadata(mockMetadata);
        return new Mock();
      }
    })
      .compile();

    controller = module.get<MenuController>(MenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
