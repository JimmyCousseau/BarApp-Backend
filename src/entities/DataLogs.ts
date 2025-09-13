import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class DataLogs {
	@ObjectIdColumn()
  _id: ObjectId
    
	@Column('datetime')
	date: Date

	@Column('varchar', { length: 30 })
	username: string

	@Column('tinyint')
	table_id: number | null

	@Column('tinytext')
	action: string

	@Column('tinytext')
	details: string | null
}
