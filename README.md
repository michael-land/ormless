# [Ormless](https://github.com/xiaoyu-tamu/ormless)

[Ormless](https://github.com/xiaoyu-tamu/ormless) is inspired by [Prisma2](https://github.com/prisma/prisma) and is built on a Typesafe SQL query builder called [Kysely](https://github.com/koskimas/kysely) that aims to add useful shortcut functions with no fuss and no surprises, fully and automatically typed.

Features:

- **A command-line tool introspect SQL database and generate the data schema for tables, views, constraints and enums**
- **Simple and fun way to select, insert, update and delete objects using the full power of SQL and Typescript**

# Installation

Ormless currently only works on postgres.

MySQL and sqlite support will be added once Kysely support them. Kysely also has a simple interface for [third-party dialects](https://koskimas.github.io/kysely/interfaces/Dialect.html).

\*\* This library is still work in progress and so does Kysely.
