# [Ormless](https://github.com/xiaoyu-tamu/ormless)

[Ormless](https://github.com/xiaoyu-tamu/ormless) is inspired by [Prisma2](https://github.com/prisma/prisma) and is built on a Typesafe SQL query builder called [Kysely](https://github.com/koskimas/kysely) that aims to add useful shortcut functions with no fuss and no surprises, fully and automatically typed.

Features:

- **A command-line tool introspect SQL database and generate the data schema for tables, views, constraints and enums**
- **Simple and fun way to select, insert, update and delete objects using the full power of SQL and Typescript**

# Installation

Ormless currently only works on postgres.

MySQL and sqlite support will be added once Kysely support them. Kysely also has a simple interface for [third-party dialects](https://koskimas.github.io/kysely/interfaces/Dialect.html).

\*\* This library is still work in progress and so does Kysely.

# Example

ormless.config.json

```json
{
  "database": {
    "information_schema": {
      "tables": {
        "tables": {},
        "table_constraints": {},
        "key_column_usage": {},
        "columns": {},
        "constraint_column_usage": {}
      }
    },
    "pg_catalog": {
      "tables": {
        "pg_constraint": {},
        "pg_enum": {},
        "pg_type": {},
        "pg_namespace": {}
      }
    }
  },
  "paths": ["information_schema", "pg_catalog"],
  "connection": {
    "dialect": "postgres",
    "database": "postgres",
    "host": "localhost",
    "user": "michael"
  },
  "generate": {
    "postgres.interface": {
      "root": "Postgres",
      "folder": "src/introspection/explorer"
    }
  },
  "types": {
    "regproc": "string",
    "pg_node_tree": "string",
    "aclitem": "string",
    "oidvector": "string",
    "pg_lsn": "string",
    "xid": "string",
    "int2vector": "string",
    "anyarray": "string",
    "regtype": "string",
    "pg_ndistinct": "string",
    "pg_dependencies": "string",
    "pg_mcv_list": "string"
  },
  "import": "../src/ormless"
}
```

[Introspect Result](https://github.com/xiaoyu-tamu/ormless/blob/main/example/database.ts)

[Generate Repository Client](https://github.com/xiaoyu-tamu/ormless/blob/main/example/index.ts)

# Build-in Shortcuts

- selectOne
- selectMany
- createOne
- createMany
- updateOne
- updateMany
- deleteOne
- deleteMany
