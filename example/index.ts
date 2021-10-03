import { CustomerRepository, db } from './database';

async function main() {
  const customerRepo = new CustomerRepository();

  const listing = await customerRepo.selectOne({
    db,
    select: ['active', 'activebool', 'lastName', 'firstName'],
    where: { customerEmailUk: { email: 'AARON.SELBY@sakilacustomer.org' } },
  });

  console.log(listing);

  await db.destroy();
}

main();
