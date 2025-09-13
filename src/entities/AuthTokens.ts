import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class AuthTokens {
	
    @ObjectIdColumn()
    _id: ObjectId
    
	@Column('varchar', { length: 30 })
	uid: string

	@Column('varchar', { length: 200 })
	token: string

	// expiration_date is in minutes
	@Column('int')
	expiration_date: number
}
