import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource, MongoRepository } from 'typeorm'
import { Orders } from '../../entities/Orders'
import { EState } from '../../entities/States'
import { ObjectId } from 'mongodb'

@Injectable()
export class OrderService {
	orders: MongoRepository<Orders>
	constructor(
		@InjectDataSource()
		private readonly dataSource: DataSource
	) {
		this.orders = this.dataSource.getMongoRepository(Orders)
	}

	async findAll(): Promise<Orders[]> {
		return await this.orders.find()
	}

	async findAllWaitingPaiement(): Promise<Orders[]> {
		return await this.orders.find({
			where: {
				state: EState.WAITING_PAIEMENT,
			},
			order: {
				table_id: 'ASC',
			},
		})
	}

	async findAllPending(): Promise<Orders[]> {
		return await this.orders.find({
			where: {
				$or: [{ state: EState.BEING_PREPARED }, { state: EState.TO_SERVE }],
			},
			order: {
				table_id: 1,
				name: 1,
			},
		})
	}

	async findAllBeingPrepared(): Promise<Orders[]> {
		return await this.orders.find({
			select: {
				_id: false,
				state: false,
			},
			where: {
				state: EState.BEING_PREPARED,
			},
			order: {
				table_id: 'ASC',
				name: 'ASC',
			},
		})
	}

	async delete(id: ObjectId): Promise<any> {
		return await this.orders.delete({
			_id: new ObjectId(id),
		})
	}

	async update(order: Orders): Promise<any> {
		return await this.orders.update(
			{
				_id: new ObjectId(order._id),
			},
			{
				amount: order.amount,
				note: order.note,
				state: order.state,
				unit_price: order.unit_price, // Why ?
			}
		)
	}

	async updateStatePrepared(order: Orders): Promise<any> {
		return this.orders.updateMany(
			{
				table_id: order.table_id,
				waiter: order.waiter,
				state: EState.BEING_PREPARED,
			},
			{ $set: { state: EState.TO_SERVE } }
		)
	}

	async updateStateServed(order: Orders): Promise<any> {
		return this.orders.updateMany(
			{
				table_id: order.table_id,
				waiter: order.waiter,
				state: EState.TO_SERVE,
			},
			{ $set: { state: EState.WAITING_PAIEMENT } }
		)
	}

	async updateStatePaid(table_id: number): Promise<any> {
		return this.orders.updateMany(
			{ table_id, state: EState.WAITING_PAIEMENT },
			{ $set: { state: EState.PAID } }
		)
	}

	async insert(needPreparation: string, order: Orders): Promise<any> {
		const state =
			parseInt(needPreparation) == 1 ? EState.BEING_PREPARED : EState.TO_SERVE
		return await this.orders.insert({
			name: order.name,
			waiter: order.waiter,
			table_id: order.table_id,
			amount: order.amount,
			state: state,
			note: order.note,
			unit_price: order.unit_price,
		})
	}
}
