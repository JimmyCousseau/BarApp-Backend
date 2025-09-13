import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class GlobalSettings {
	@ObjectIdColumn()
	_id: ObjectId

	@Column('varchar', { length: 30 })
	parameter_id: string

	@Column('text')
	value: string
}
