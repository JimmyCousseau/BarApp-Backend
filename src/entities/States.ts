import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity()
export class States {
	@ObjectIdColumn()
	_id: ObjectId

	@Column('varchar', { length: 30 })
	state: string
}

export enum EState {
    BEING_PREPARED = "En préparation",
    TO_SERVE = "À servir",
    WAITING_PAIEMENT = "En attente de paiement",
    PAID = "Payé",
}
