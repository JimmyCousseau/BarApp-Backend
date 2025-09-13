import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Roles {
	@ObjectIdColumn()
	_id: ObjectId

	@Column({ unique: true })
	role: string

	@Column('tinyint')
	access_menu: boolean

	@Column('tinyint')
	access_orders: boolean

	@Column('tinyint')
	access_checkout: boolean

	@Column('tinyint')
	access_history: boolean

	@Column('tinyint')
	access_administration_panel: boolean

	@Column('tinyint')
	access_statistics: boolean

	@Column('tinyint')
	access_kitchen: boolean

	@Column('tinyint')
	modify_map: boolean

	@Column('tinyint')
	modify_menu: boolean
}

export enum Permission {
    ACCESS_MENU = "access_menu",
    ACCESS_ORDERS = "access_orders",
    ACCESS_CHECKOUT = "access_checkout",
    ACCESS_HISTORY = "access_history",
    ACCESS_ADMINISTRATION_PANEL = "access_administration_panel",
    ACCESS_STATISTICS = "access_statistics",
    ACCESS_KITCHEN = "access_kitchen",
    MODIFY_MAP = "modify_map",
    MODIFY_MENU = "modify_menu",
}
