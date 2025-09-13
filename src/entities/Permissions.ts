import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Permissions {
	@ObjectIdColumn()
	_id: ObjectId

	@Column({ unique: true })
	role_id: number

	@Column('tinyint')
	can_access_menu: boolean

	@Column('tinyint')
	can_access_orders: boolean

	@Column('tinyint')
	can_access_checkout: boolean

	@Column('tinyint')
	can_access_history: boolean

	@Column('tinyint')
	can_access_administration_panel: boolean

	@Column('tinyint')
	can_access_statistics: boolean

	@Column('tinyint')
	can_access_kitchen: boolean
}
