import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '13771377',
  database: 'task-management',
  entities: ['./**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [`./db/migrations/*{.ts,.js}`],
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
