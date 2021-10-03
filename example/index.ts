/**
 * To generate client and typings: ormless -c example/ormless.config.json
 *
 * The purpose of this example is to show api usage.
 * For real world example, please refer to https://github.com/koskimas/kysely/tree/master/example
 */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as dotnev from 'dotenv';
import { CamelCasePlugin, Kysely } from 'kysely';
import { CustomerRepository, Database, DatabaseSchema } from './database';

dotnev.config();
main();

async function main() {
  const db = new Kysely<DatabaseSchema>({
    database: process.env.DATABASE_NAME!,
    host: process.env.DATABASE_HOST!,
    user: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    dialect: 'postgres',
    plugins: [new CamelCasePlugin()],
  });

  const customerRepo = new CustomerRepository();
  const select: Database.Customer.Column[] = ['active', 'activebool', 'lastName', 'firstName'];

  const createdCustomer = await customerRepo.createOne({
    db,
    select,
    data: {
      customerId: -1,
      addressId: 1,
      email: 'lookup@email.com',
      firstName: '',
      lastName: '',
      storeId: 1,
      active: 0,
      activebool: false,
      createDate: new Date(),
      lastUpdate: new Date(),
    },
  });

  // select unique customer by primary key
  const fetchedCustomer = await customerRepo.selectOne({
    db,
    select,
    where: { customerPkey: { customerId: -1 } },
  });

  // update unique customer by unique key
  const updatedCustomer = await customerRepo.updateOne({
    db,
    select,
    where: { customerEmailUk: { email: 'lookup@email.com' } },
    data: { activebool: true },
  });

  const deletedCustomer = await customerRepo.deleteOne({
    db,
    select,
    where: { customerPkey: { customerId: -1 } },
  });

  const justDeletedCustomers = await customerRepo.selectMany({
    db,
    select: ['customerId', 'email'],
    where: [['customerId', '=', -1]],
    limit: 500,
    offset: 0,
  });

  console.log({
    createdCustomer,
    fetchedCustomer,
    updatedCustomer,
    deletedCustomer,
    justDeletedCustomers,
  });

  await db.destroy();
}
