/* eslint-disable @typescript-eslint/no-explicit-any */

import { AnyColumn, Kysely } from 'kysely';
import { ORMLessMissingWhereClasueException } from './ormless.exceptions';
import {
  CreateManyArgs,
  CreateOneArgs,
  DeleteManyArgs,
  DeleteOneArgs,
  FindManyArgs,
  FindOneArgs,
  ORMLessMetadata,
  UpdateManyArgs,
  UpdateOneArgs,
} from './ormless.interfaces';

export class ORMLess<DB, META extends ORMLessMetadata<DB>> {
  constructor(private readonly db: Kysely<DB>) {}

  async selectOne<TB extends keyof DB & string, S extends AnyColumn<DB, TB>>(args: FindOneArgs<DB, TB, S, META>) {
    const { transaction: db = this.db, table, where, select } = args;

    let qb = db.selectFrom(table).select(select);
    const whereKeys = Object.keys(where);
    if (whereKeys.length !== 1) {
      throw new ORMLessMissingWhereClasueException();
    }

    for (const [lfs, rhs] of Object.entries((where as any)[whereKeys[0]])) {
      qb = qb.where(lfs as any, '=', rhs);
    }
    return qb.executeTakeFirstOrThrow();
  }

  async selectMany<TB extends keyof DB & string, S extends AnyColumn<DB, TB>>(args: FindManyArgs<DB, TB, S>) {
    const { transaction: db = this.db, table, where, select, limit, offset } = args;
    if (!select.length) {
      return [];
    }

    let qb = db.selectFrom(table).select(select);
    for (const [lfs, op, rhs] of where) {
      qb = qb.where(lfs as any, op, rhs);
    }

    return qb.limit(limit).offset(offset).execute();
  }

  async createOne<TB extends keyof DB & string, S extends AnyColumn<DB, TB>>(args: CreateOneArgs<DB, TB, S, META>) {
    const { transaction: db = this.db, table, data, select = [] } = args;
    return db
      .insertInto(table)
      .values(data as any)
      .returning(select)
      .executeTakeFirstOrThrow();
  }

  async createMany<TB extends keyof DB & string, S extends AnyColumn<DB, TB>>(args: CreateManyArgs<DB, TB, S, META>) {
    const { transaction: db = this.db, table, data, select = [] } = args;
    if (!data.length) {
      return [];
    }
    return db
      .insertInto(table)
      .values(data as any)
      .returning(select)
      .execute();
  }

  async updateOne<TB extends keyof DB & string, S extends AnyColumn<DB, TB>>(args: UpdateOneArgs<DB, TB, S, META>) {
    const { transaction: db = this.db, table, where, data, select = [] } = args;
    let qb = db.updateTable(table).set(data as any);

    const whereKeys = Object.keys(where);
    if (whereKeys.length !== 1) {
      throw new ORMLessMissingWhereClasueException();
    }

    for (const [lfs, rhs] of Object.entries((where as any)[whereKeys[0]])) {
      qb = qb.where(lfs as any, '=', rhs);
    }

    return qb.returning(select).executeTakeFirstOrThrow();
  }

  async updateMany<TB extends keyof DB & string, S extends AnyColumn<DB, TB>>(args: UpdateManyArgs<DB, TB, S, META>) {
    const { transaction: db = this.db, table, where, data, select = [] } = args;
    if (!data.length) {
      return [];
    }
    if (!where.length) {
      throw new Error('updateMany without where clause is not allowed');
    }

    let qb = db
      .updateTable(table)
      .set(data as any)
      .returning(select);
    for (const [lfs, op, rhs] of where) {
      qb = qb.where(lfs as any, op, rhs);
    }
    return qb.execute();
  }

  async deleteOne<TB extends keyof DB & string, S extends AnyColumn<DB, TB>>(args: DeleteOneArgs<DB, TB, S, META>) {
    const { transaction: db = this.db, table, where, select = [] } = args;
    let qb = db.deleteFrom(table).returning(select);

    const whereKeys = Object.keys(where);
    if (whereKeys.length !== 1) {
      throw new ORMLessMissingWhereClasueException();
    }

    for (const [lfs, rhs] of Object.entries((where as any)[whereKeys[0]])) {
      qb = qb.where(lfs as any, '=', rhs);
    }

    return qb.executeTakeFirstOrThrow();
  }

  async deleteMany<TB extends keyof DB & string, S extends AnyColumn<DB, TB>>(args: DeleteManyArgs<DB, TB, S, META>) {
    const { transaction: db = this.db, table, where, select = [] } = args;
    if (!where.length) {
      throw new Error('updateMany without where clause is not allowed');
    }

    let qb = db.deleteFrom(table).returning(select);
    for (const [lfs, op, rhs] of where) {
      qb = qb.where(lfs as any, op, rhs);
    }
    return qb.execute();
  }
}
