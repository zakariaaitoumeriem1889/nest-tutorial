import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync, mkdirSync } from 'fs';
import mysql from 'mysql2/promise';
import { dirname } from 'path';
import { Client, QueryResult } from 'pg';
import { DatabaseType } from '../config/orm.config';

@Injectable()
export class DatabaseCreatorService {
    private readonly logger: Logger = new Logger(DatabaseCreatorService.name);

    constructor(private readonly configService: ConfigService) {}

    async createDatabaseIfNotExists(): Promise<void> {
        const dbType: DatabaseType = this.configService.get<DatabaseType>('DB_TYPE') || 'postgres';
        const dbName: string = this.configService.get<string>('DB_NAME') || 'app';
        try {
            this.logger.log(`Verification of the existence of the database: ${dbName}`);
            switch (dbType) {
                case 'postgres':
                    await this.createPostgresDatabase(dbName);
                    break;
                case 'mysql':
                case 'mariadb':
                    await this.createMySQLDatabase(dbName);
                    break;
                case 'sqlite':
                    await this.createSQLiteDatabase(dbName);
                    break;
                default:
                    throw new Error(`Database type not supported: ${dbType}`);
            }
            this.logger.log(`Base de données ${dbName} prête`);
        } catch (error) {
            this.logger.error(`Error while creating the database: ${error.message}`);
            throw error;
        }
    }

    private async createPostgresDatabase(dbName: string): Promise<void> {
        const client: Client = new Client({
            host: this.configService.get<string>('DB_HOST') || 'localhost',
            port: Number(this.configService.get<string>('DB_PORT') || 5432),
            user: this.configService.get<string>('DB_USERNAME') || 'postgres',
            password: this.configService.get<string>('DB_PASSWORD') || '',
            database: 'postgres'
        });
        try {
            await client.connect();
            const result: QueryResult = await client.query(
                `SELECT 1 FROM pg_database WHERE datname = $1`,
                [dbName]
            );
            if (result.rowCount === 0) {
                this.logger.log(`Creating the PostgreSQL database: ${dbName}`);
                await client.query(`CREATE DATABASE "${dbName}"`);
                this.logger.log(`Database ${dbName} successfully created`);
            } else {
                this.logger.log(`The database ${dbName} already exists`);
            }
        } finally {
            await client.end();
        }
    }

    private async createMySQLDatabase(dbName: string): Promise<void> {
        const connection: mysql.Connection = await mysql.createConnection({
            host: this.configService.get<string>('DB_HOST') || 'localhost',
            port: Number(this.configService.get<string>('DB_PORT') || 3306),
            user: this.configService.get<string>('DB_USERNAME') || 'root',
            password: this.configService.get<string>('DB_PASSWORD') || ''
        });
        try {
            const [databases] = await connection.query(
                `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`,
                [dbName]
            );
            if (Array.isArray(databases) && databases.length === 0) {
                this.logger.log(`Creating the MySQL/MariaDB database: ${dbName}`);
                await connection.query(`CREATE DATABASE \`${dbName}\``);
                this.logger.log(`Database ${dbName} successfully created`);
            } else {
                this.logger.log(`The database ${dbName} already exists`);
            }
        } finally {
            await connection.end();
        }
    }

    private async createSQLiteDatabase(dbPath: string): Promise<void> {
        const directory: string = dirname(dbPath);
        if (directory && directory !== '.' && !existsSync(directory)) {
            this.logger.log(`Création du répertoire pour SQLite: ${directory}`);
            mkdirSync(directory, { recursive: true });
        }
        if (existsSync(dbPath)) {
            this.logger.log(`La base de données SQLite ${dbPath} existe déjà`);
        } else {
            this.logger.log(`La base de données SQLite ${dbPath} sera créée automatiquement`);
        }
    }
}
