import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '13771377',
  database: 'task-management',
  // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: [`${__dirname}/migrations/*{.ts,.js}`],
};

const dataSource = new DataSource(dataSourceOption);
export default dataSource;
