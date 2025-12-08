import dotenv from 'dotenv';
import findConfig from 'find-config';
import { DataSource, DataSourceOptions } from 'typeorm';

export type DatabaseType = 'mysql' | 'mariadb' | 'postgres' | 'sqlite';

dotenv.config({ path: findConfig('.env')! });

const dbType = (process.env.DB_TYPE as DatabaseType) || 'postgres';

const baseConfig: DataSourceOptions = {
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    entities: [__dirname + '/../**/entities/*.{js,ts}'],
    migrations: [__dirname + '/../migrations/*.{js,ts}'],
    migrationsTableName: 'migrations'
} as DataSourceOptions;

let specificConfig: DataSourceOptions;

if (dbType === 'sqlite') {
    specificConfig = {
        type: 'sqlite',
        database: process.env.DB_NAME || 'database.sqlite'
    };
} else {
    specificConfig = {
        type: dbType,
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || (dbType === 'postgres' ? 5432 : 3306)),
        username: process.env.DB_USERNAME || (dbType === 'postgres' ? 'postgres' : 'root'),
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'app'
    };
}

export const config: DataSourceOptions = {
    ...specificConfig,
    ...baseConfig
} as DataSourceOptions;

const OrmDataSource: DataSource = new DataSource(config);

export default OrmDataSource;
