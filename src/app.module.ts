import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { Accounts } from './entities/Accounts';
import { AuthTokens } from './entities/AuthTokens';
import { BasicProducts } from './entities/BasicProducts';
import { DataLogs } from './entities/DataLogs';
import { GlobalSettings } from './entities/GlobalSettings';
import { Labels } from './entities/Labels';
import { Orders } from './entities/Orders';
import { Permissions } from './entities/Permissions';
import { Products } from './entities/Products';
import { Recipes } from './entities/Recipes';
import { Roles } from './entities/Roles';
import { Sections } from './entities/Sections';
import { States } from './entities/States';

import { BasicProductsModule } from './api/basic-products/basic-products.module';
import { GlobalSettingsModule } from './api/global-settings/global-settings.module';
import { LabelsModule } from './api/labels/labels.module';
import { LoginModule } from './api/login/login.module';
import { OrderModule } from './api/order/order.module';
import { ProductsModule } from './api/products/products.module';
import { RecipesModule } from './api/recipes/recipes.module';
import { RoleModule } from './api/role/role.module';
import { SectionsModule } from './api/sections/sections.module';
import { StateModule } from './api/state/state.module';
import { UserModule } from './api/user/user.module';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import * as dotenv from 'dotenv';
import { PermissionGuard } from './security/guards/permission.guard';
import { LoggingInterceptor } from './security/interceptors/logging.interceptor';
import { CacheModule } from '@nestjs/cache-manager'

dotenv.config();

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'mongodb',
			url: 'mongodb://root:pass@mongo:27017/bar-app?authSource=admin', // URL de MongoDB dans Docker
			synchronize: true, // À utiliser uniquement en développement
			entities: [
				Sections,
				Products,
				Orders,
				Accounts,
				Roles,
				DataLogs,
				AuthTokens,
				Permissions,
				GlobalSettings,
				Labels,
				States,
				Recipes,
				BasicProducts,
			],
		}),
		TypeOrmModule.forFeature([DataLogs]),
		OrderModule,
		LoginModule,
		AppModule,
		UserModule,
		RoleModule,
		GlobalSettingsModule,
		LabelsModule,
		SectionsModule,
		StateModule,
		ProductsModule,
		BasicProductsModule,
		RecipesModule,
		CacheModule.register(),
	],
	controllers: [AppController],
	providers: [
		{
			provide: APP_GUARD,
			useClass: PermissionGuard,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: LoggingInterceptor,
		},
		// {
		//   provide: APP_INTERCEPTOR,
		//   useClass: HttpCacheInterceptor,
		// },
		AppService,
	],
})
export class AppModule {}
