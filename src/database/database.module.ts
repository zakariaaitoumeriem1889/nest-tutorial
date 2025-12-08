import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from '../config/orm.config';
import { DatabaseCreatorService } from './database-creator.service';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => {
                const dbCreator = new DatabaseCreatorService(configService);
                await dbCreator.createDatabaseIfNotExists();
                return config;
            }
        })
    ],
    providers: [DatabaseCreatorService],
    exports: [DatabaseCreatorService]
})
export class DatabaseModule {}
