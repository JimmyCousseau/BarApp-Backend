import {
	Entity,
	Column,
	ObjectIdColumn,
	ObjectId,
} from 'typeorm'

@Entity()
export class Accounts {
	@ObjectIdColumn()
	_id: ObjectId

	@Column('varchar', { length: 30 })
	username: string

	@Column('varchar', { length: 100 })
	password: string

	@Column('varchar', { length: 30 })
	role: string
}
