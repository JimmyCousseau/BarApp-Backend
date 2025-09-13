import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'log', 'debug', 'verbose'],
	})
  app.enableCors();
  const logger = new Logger('Bootstrap')
	logger.log('Application is starting...')
  await app.listen(3000);

  if (module.hot) {
		module.hot.accept()
		module.hot.dispose(() => app.close())
	}
}
bootstrap();
