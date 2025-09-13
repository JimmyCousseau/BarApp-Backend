import { Test, TestingModule } from '@nestjs/testing';
import { Orders } from '../../entities/Orders';
import { OrderController } from '../../api/order/order.controller';
import { OrderService } from '../../api/order/order.service';
import { ModuleMocker, MockFunctionMetadata } from 'jest-mock'
import { ObjectId } from 'typeorm';

const moduleMocker = new ModuleMocker(global);

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrderController],
		})
			.useMocker((token) => {
				const results: Orders[] = [
					{
						_id: new ObjectId(),
						name: 'Beer',
						waiter: 'Jimmy',
						table_id: 12,
						unit_price: 10,
						note: '',
						amount: 6,
						state: 'En attente de paiement',
						date: new Date(2022, 7, 19, 17, 28, 25),
					},
					{
						_id: new ObjectId(),
						name: 'Pizza',
						waiter: 'Jimmy',
						table_id: 12,
						unit_price: 10,
						note: '',
						amount: 3,
						state: 'En attente de paiement',
						date: new Date(2022, 7, 19, 19, 22, 7),
					},
				]

				if (token === OrderService) {
					return {
						findAll: jest.fn().mockResolvedValue(results), // 👈 méthode réelle du service
					}
				}

				if (typeof token === 'function') {
					const mockMetadata = moduleMocker.getMetadata(
						token
					) as MockFunctionMetadata<any, any>
					const Mock = moduleMocker.generateFromMetadata(mockMetadata)
					return new Mock()
				}
			})
			.compile()

		controller = module.get<OrderController>(OrderController)
	})


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
