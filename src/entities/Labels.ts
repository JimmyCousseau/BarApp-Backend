import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class Labels {
	@ObjectIdColumn()
	_id: ObjectId

	@Column('varchar', { length: 25 })
	label: string
}
