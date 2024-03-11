import { DataSource } from "typeorm";
import { config as dotenvConfig } from 'dotenv';
import * as path from 'path';

dotenvConfig({
    path: path.join(__dirname, '../../../.env'),
    encoding: 'utf8',
    // debug: true,
});

export class PostgresDataSource extends DataSource {}

export const config = new PostgresDataSource({
    type: 'postgres',
    host: process.env.POSTGRES_HOST !== 'localhost' ? process.env.POSTGRES_HOST : 'localhost',
    port: (process.env.POSTGRES_PORT as unknown as number) || 5432,
    username: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: process.env.POSTGRES_DB ?? 'postgres',
    synchronize: process.env.DB_SYNCHRONIZE === 'true' || false,
    ssl: process.env.POSTGRES_SSL === 'true' || false,
    logging: process.env.DB_LOGGING === 'true' || false,
    useUTC: true,
    entities: [__dirname + '/../modules/**/models/*.model{.ts,.js}'],
    migrationsTableName: 'migration',
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    isolateWhereStatements: true,
});
