import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class BasicProducts {
	@ObjectIdColumn()
	_id: ObjectId

	@Column('varchar', { length: 30 })
	name: string

	@Column('int')
	amount: number
}
