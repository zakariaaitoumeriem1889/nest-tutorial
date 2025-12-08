import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const logger: Logger = new Logger(AppModule.name);

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port: number = Number(process.env.PORT || 3000);
    await app.listen(port);
    logger.log(`Server listening on http://localhost:${port}`);
}

bootstrap();
