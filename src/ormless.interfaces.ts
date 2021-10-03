/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyColumn, FilterOperator, Kysely, ValueExpressionOrList } from 'kysely';
import { DynamicReferenceBuilder } from 'kysely/dist/cjs/dynamic/dynamic-reference-builder';
import {
  AnyQueryBuilder,
  AnyRawBuilder,
  QueryBuilderFactory,
  RawBuilderFactory,
} from 'kysely/dist/cjs/query-builder/type-utils';

export type ORMLessMetadata<DB> = {
  [TB in keyof DB]: {
    unique: { [K: string]: any };
    insert: any;
    update: any;
  };
};

export type WhereUniqueInput<DB, TB extends keyof DB, META extends ORMLessMetadata<DB>> = {
  [U in keyof META[TB]['unique']]?: {
    [K in META[TB]['unique'][U]]: DB[TB][K];
  };
};

export type WhereInputLHS<DB, TB extends keyof DB> =
  | AnyColumn<DB, TB>
  | AnyQueryBuilder
  | QueryBuilderFactory<DB, TB>
  | AnyRawBuilder
  | RawBuilderFactory<DB, TB>
  | DynamicReferenceBuilder<any>;

export interface FindOneArgs<
  DB,
  TB extends keyof DB & string,
  META extends ORMLessMetadata<DB>,
  S extends AnyColumn<DB, TB>
> {
  db: Kysely<DB>;
  debug?: true;
  where: WhereUniqueInput<DB, TB, META>;
  select: ReadonlyArray<S>;
}

export interface FindManyArgs<
  DB,
  TB extends keyof DB & string,
  S extends AnyColumn<DB, TB>,
  RE = WhereInputLHS<DB, TB>
> {
  db: Kysely<DB>;
  debug?: true;
  where: ReadonlyArray<[RE, FilterOperator, ValueExpressionOrList<DB, TB, RE>]>;
  select: ReadonlyArray<S>;
  limit: number;
  offset: number;
}

export interface CreateOneArgs<
  DB,
  TB extends keyof DB & string,
  META extends ORMLessMetadata<DB>,
  S extends AnyColumn<DB, TB>
> {
  db: Kysely<DB>;
  debug?: true;
  data: META[TB]['insert'];
  select: ReadonlyArray<S>;
}

export interface CreateManyArgs<
  DB,
  TB extends keyof DB & string,
  META extends ORMLessMetadata<DB>,
  S extends AnyColumn<DB, TB>
> {
  db: Kysely<DB>;
  debug?: true;
  data: ReadonlyArray<META[TB]['insert']>;
  select: ReadonlyArray<S>;
}

export interface UpdateOneArgs<
  DB,
  TB extends keyof DB & string,
  META extends ORMLessMetadata<DB>,
  S extends AnyColumn<DB, TB>
> {
  db: Kysely<DB>;
  debug?: true;
  data: META[TB]['update'];
  select: ReadonlyArray<S>;
  where: WhereUniqueInput<DB, TB, META>;
}

export interface UpdateManyArgs<
  DB,
  TB extends keyof DB & string,
  META extends ORMLessMetadata<DB>,
  S extends AnyColumn<DB, TB>,
  RE = WhereInputLHS<DB, TB>
> {
  db: Kysely<DB>;
  debug?: true;
  data: ReadonlyArray<META[TB]['update']>;
  select: ReadonlyArray<S>;
  where: ReadonlyArray<[RE, FilterOperator, ValueExpressionOrList<DB, TB, RE>]>;
}

export interface DeleteOneArgs<
  DB,
  TB extends keyof DB & string,
  META extends ORMLessMetadata<DB>,
  S extends AnyColumn<DB, TB>
> {
  db: Kysely<DB>;
  debug?: true;
  select: ReadonlyArray<S>;
  where: WhereUniqueInput<DB, TB, META>;
}

export interface DeleteManyArgs<
  DB,
  TB extends keyof DB & string,
  S extends AnyColumn<DB, TB>,
  RE = WhereInputLHS<DB, TB>
> {
  db: Kysely<DB>;
  debug?: true;
  select: ReadonlyArray<S>;
  where: ReadonlyArray<[RE, FilterOperator, ValueExpressionOrList<DB, TB, RE>]>;
}
