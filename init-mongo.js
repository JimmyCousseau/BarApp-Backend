db = db.getSiblingDB('bar-app')

if (!db.getCollectionNames().includes('accounts')) {
	db.createCollection('accounts')
}

const collections = [
	'accounts',
	'authToken',
	'basicProducts',
	'dataLogs',
	'globalSettings',
	'labels',
	'orders',
	'permissions',
	'products',
	'recipes',
	'roles',
	'sections',
	'states',
]

collections.forEach((collectionName) => {
	if (!db.getCollectionNames().includes(collectionName)) {
		db.createCollection(collectionName)
		print(`Collection "${collectionName}" créée.`)
	}
})

db.accounts.insertOne({
	username: 'Jimmy',
	password: '$2b$10$np1pv/ELDASqhlxwj0kCh.og0UJpb4T4mILRTEYgtnvzXaqDuI0AW', // Admin123
	role: 'admin',
})

const adminRole = {
	role: 'admin',
	access_menu: true,
	access_orders: true,
	access_checkout: true,
	access_history: true,
	access_administration_panel: true,
	access_statistics: true,
	access_kitchen: true,
	modify_map: true,
	modify_menu: true,
}

const existingRole = db.roles.findOne({ role: 'admin' })
if (!existingRole) {
	db.roles.insertOne(adminRole)
	print('Rôle admin inséré avec toutes les permissions.')
} else {
	print('Le rôle admin existe déjà.')
}

print('Compte admin créé avec succès dans la collection "accounts" !')
