/* eslint-disable @typescript-eslint/no-explicit-any */

import { ORMLessMissingWhereClasueException } from './ormless.exceptions';
import {
  AnyColumn,
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

// TODO, overload typescript functions to allow return debug ? qb.compile() : qb.executeTakeFirstOrThrow();

export abstract class ORMLess<DB, META extends ORMLessMetadata<DB>, TB extends keyof DB & string> {
  protected abstract table: TB;
  protected abstract primaryKeys: ReadonlyArray<keyof META[TB]>;

  async selectOne<S extends AnyColumn<DB, TB>>(args: FindOneArgs<DB, TB, META, S>) {
    const { db, debug = false, where, select } = args;

    let qb = db.selectFrom(this.table).select(select);
    const whereKeys = Object.keys(where);

    for (const [lfs, rhs] of Object.entries((where as any)[whereKeys[0]])) {
      qb = qb.where(lfs as any, '=', rhs);
    }

    return qb.executeTakeFirstOrThrow();
  }

  async selectMany<S extends AnyColumn<DB, TB>>(args: FindManyArgs<DB, TB, S>) {
    const { db, debug = false, where, select, limit, offset } = args;
    if (!select.length) {
      return [];
    }

    let qb = db.selectFrom(this.table).select(select);
    for (const [lfs, op, rhs] of where) {
      qb = qb.where(lfs as any, op, rhs);
    }
    qb = qb.limit(limit).offset(offset);

    return qb.execute();
  }

  async createOne<S extends AnyColumn<DB, TB>>(args: CreateOneArgs<DB, TB, META, S>) {
    const { db, debug = false, data, select = [] } = args;
    const qb = db
      .insertInto(this.table)
      .values(data as any)
      .returning(select);

    return qb.executeTakeFirstOrThrow();
  }

  async createMany<S extends AnyColumn<DB, TB>>(args: CreateManyArgs<DB, TB, META, S>) {
    const { db, debug = false, data, select = [] } = args;
    if (!data.length) {
      return [];
    }
    const qb = db
      .insertInto(this.table)
      .values(data as any)
      .returning(select);

    return qb.execute();
  }

  async updateOne<S extends AnyColumn<DB, TB>>(args: UpdateOneArgs<DB, TB, META, S>) {
    const { db, debug = false, where, data, select = [] } = args;
    const whereKeys = Object.keys(where);
    if (whereKeys.length !== 1) {
      throw new ORMLessMissingWhereClasueException();
    }

    let qb = db
      .updateTable(this.table)
      .set(data as any)
      .returning(select);

    for (const [lfs, rhs] of Object.entries((where as any)[whereKeys[0]])) {
      qb = qb.where(lfs as any, '=', rhs);
    }

    return qb.executeTakeFirstOrThrow();
  }

  async updateMany<S extends AnyColumn<DB, TB>>(args: UpdateManyArgs<DB, TB, META, S>) {
    const { db, debug = false, where, data, select = [] } = args;
    if (!data.length) {
      return [];
    }
    if (!where.length) {
      throw new ORMLessMissingWhereClasueException();
    }

    let qb = db
      .updateTable(this.table)
      .set(data as any)
      .returning(select);

    for (const [lfs, op, rhs] of where) {
      qb = qb.where(lfs as any, op, rhs);
    }

    return qb.execute();
  }

  async deleteOne<S extends AnyColumn<DB, TB>>(args: DeleteOneArgs<DB, TB, META, S>) {
    const { db, debug = false, where, select = [] } = args;
    const whereKeys = Object.keys(where);
    if (whereKeys.length !== 1) {
      throw new ORMLessMissingWhereClasueException();
    }

    let qb = db.deleteFrom(this.table).returning(select);

    for (const [lfs, rhs] of Object.entries((where as any)[whereKeys[0]])) {
      qb = qb.where(lfs as any, '=', rhs);
    }

    return qb.executeTakeFirstOrThrow();
  }

  async deleteMany<S extends AnyColumn<DB, TB>>(args: DeleteManyArgs<DB, TB, S>) {
    const { db, debug = false, where, select = [] } = args;
    if (!where.length) {
      throw new ORMLessMissingWhereClasueException();
    }

    let qb = db.deleteFrom(this.table).returning(select);
    for (const [lfs, op, rhs] of where) {
      qb = qb.where(lfs as any, op, rhs);
    }
    return qb.execute();
  }
}
