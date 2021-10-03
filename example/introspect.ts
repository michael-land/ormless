import * as path from 'path';
import { cli } from '../src/cli';
import * as prettier from 'prettier';

console.time('introspect');
prettier
  .resolveConfig('.prettierrc')
  .then((prettier) =>
    cli({
      database: {
        public: {},
      },
      prettier,

      paths: ['public'],
      connection: {
        database: process.env.DATABASE_NAME!,
        host: process.env.DATABASE_HOST!,
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PASSWORD!,
        dialect: 'postgres',
      },
      types: {},
      generate: {
        database: {
          root: 'db',
          folder: 'example',
          template: path.join(__dirname, '../src/templates/kysely.handlebars'),
        },
      },
    })
  )
  .then(() => {
    console.timeEnd('introspect');
  });
