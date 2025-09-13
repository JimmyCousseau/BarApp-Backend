
import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Sections {
	@ObjectIdColumn()
	_id: number

	@Column('varchar', { length: 30 })
	current_section: string

	@Column('varchar', { length: 30 })
	parent_section: string
}
