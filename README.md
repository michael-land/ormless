# [Ormless](https://github.com/xiaoyu-tamu/ormless)

[Ormless](https://github.com/xiaoyu-tamu/ormless) is inspired by [Prisma2](https://github.com/prisma/prisma) and is built on a Typesafe SQL query builder called [Kysely](https://github.com/koskimas/kysely) that aims to add useful shortcut functions with no fuss and no surprises, fully and automatically typed.

Features:

- **A command-line tool introspect SQL database and generate the data schema for tables, views, constraints and enums**
- **Simple and fun way to select, insert, update and delete objects using the full power of SQL and Typescript**

# Installation

Ormless currently only works on postgres.

MySQL and sqlite support will be added once Kysely support them. Kysely also has a simple interface for [third-party dialects](https://koskimas.github.io/kysely/interfaces/Dialect.html).

if you only need both interfaces and shortcut functions.

`npm install ormless@latest`

if you only need interfaces only.

`npx ormless@latest`

\*\* This library is still work in progress and so does Kysely.

# Example

ormless.config.json

```json
{
  "database": {
    "public": {
      "tables": {
        "actor": {},
        "address": {},
        "category": {},
        "city": {},
        "country": {},
        "customer": {},
        "film": {},
        "film_actor": {},
        "film_category": {},
        "inventory": {},
        "language": {},
        "payment": {},
        "rental": {},
        "staff": {},
        "store": {}
      }
    }
  },
  "connection": {
    "dialect": "postgres",
    "database": "postgres",
    "host": "localhost"
  },
  "generate": {
    "database": {
      "folder": "example",
      "repository": {}
    }
  }
}
```

[Introspect Result](https://github.com/xiaoyu-tamu/ormless/blob/main/example/database.ts)

[Usage](https://github.com/xiaoyu-tamu/ormless/blob/main/example/index.ts)

# Build-in Shortcuts

- selectOne
- selectMany
- createOne
- createMany
- updateOne
- updateMany
- deleteOne
- deleteMany

You can also defined custom shortcuts for all repository.

Make sure you define the imports in `generate.[filename].repository`

```json
"generate": {
  "database": {
    "folder": "./src",
    "repository": {
      "import": {
        "name": "Repository",
        "path": "./repository"
      }
    }
  }
}
```

```ts
export abstract class Repository<DB, META extends ORMLessMetadata<DB>, TB extends keyof DB & string> extends ORMLess<
  DB,
  META,
  TB
> {
  async mergeOne<
    Prev extends SetRequired<Partial<DB[TB]>, META[TB]['pk']> | undefined,
    Next extends META[TB]['insert'],
    S extends AnyColumn<DB, TB>,
    U extends keyof Prev
  >(ctx: { prev: Prev; next: Next; select: ReadonlyArray<S>; update: Array<U>; db: Kysely<DB>; debug?: true }) {
    const { next, select, update, prev, db, debug } = ctx;
    const changes = prev ? diff({ prev, next: pick(next, update) }) : undefined;
    if (!prev) return await this.createOne({ data: next, select, db, debug });

    const where = pick(prev, this.table) as META[TB]['unique'][META[TB]['pk']];

    return changes && Object.keys(changes).length
      ? await this.updateOne({ data: changes, select, where, db, debug })
      : select.every((column) => Object.keys(prev).includes(column as string))
      ? pick(prev, select)
      : await this.selectOne({ select, where, db, debug });
  }
}
```
