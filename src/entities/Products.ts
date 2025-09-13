import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Products {
	@ObjectIdColumn()
	_id: ObjectId

	@Column('varchar', { length: 30 })
	name: string

	@Column('smallint')
	price_sold: number

	@Column('smallint')
	price_bought: number

	@Column('varchar', { length: 30 })
	section: string

	@Column('mediumint')
	amount: number

	@Column('tinyint')
	need_preparation: boolean
}
