import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Orders {
	@ObjectIdColumn()
  _id: ObjectId
    
	@Column('datetime')
	date: Date

	@Column('varchar', { length: 30 })
	name: string

	@Column('varchar', { length: 30 })
	waiter: string

	@Column('tinyint')
	table_id: number

	@Column('tinyint')
	amount: number

	@Column('smallint')
	unit_price: number

	@Column('varchar', { length: 30 })
	state: string

	@Column('varchar', { length: 100 })
	note: string
}
