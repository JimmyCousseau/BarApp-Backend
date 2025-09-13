import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Recipes {
	@ObjectIdColumn()
	_id: ObjectId

	@Column('int')
	product_id: ObjectId

	@Column('int')
	basic_product_id: ObjectId

	@Column('int')
	amountUsed: number
}
