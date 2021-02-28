import { Connection, createConnection, getConnectionOptions } from "typeorm";
// ORM: typeOrm ou sequelize -> não precisa ter tanto conhecimento do sql puro.
// existe também conexão do tipo knex.js e por instalação de drive
export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test'
        ? "./src/database/database.test.sqlite"
        : defaultOptions.database,
    })
  );
};
