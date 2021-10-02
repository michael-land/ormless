/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnyColumn, FilterOperator, Transaction, ValueExpressionOrList } from 'kysely';
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

export type WhereUniqueInput<DB, META extends ORMLessMetadata<DB>, TB extends keyof DB> = {
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

export interface CommonArgs<DB, TB> {
  transaction?: Transaction<DB>;
  table: TB;
}

export interface FindOneArgs<
  DB,
  TB extends keyof DB & string,
  S extends AnyColumn<DB, TB>,
  META extends ORMLessMetadata<DB>
> extends CommonArgs<DB, TB> {
  where: WhereUniqueInput<DB, META, TB>;
  select: ReadonlyArray<S>;
}

export interface FindManyArgs<DB, TB extends keyof DB & string, S extends AnyColumn<DB, TB>, RE = WhereInputLHS<DB, TB>>
  extends CommonArgs<DB, TB> {
  where: ReadonlyArray<[RE, FilterOperator, ValueExpressionOrList<DB, TB, RE>]>;
  select: ReadonlyArray<S>;
  limit: number;
  offset: number;
}

export interface CreateOneArgs<
  DB,
  TB extends keyof DB & string,
  S extends AnyColumn<DB, TB>,
  META extends ORMLessMetadata<DB>
> extends CommonArgs<DB, TB> {
  data: META[TB]['insert'];
  select: ReadonlyArray<S>;
}

export interface CreateManyArgs<
  DB,
  TB extends keyof DB & string,
  S extends AnyColumn<DB, TB>,
  META extends ORMLessMetadata<DB>
> extends CommonArgs<DB, TB> {
  data: ReadonlyArray<META[TB]['insert']>;
  select: ReadonlyArray<S>;
}

export interface UpdateOneArgs<
  DB,
  TB extends keyof DB & string,
  S extends AnyColumn<DB, TB>,
  META extends ORMLessMetadata<DB>
> extends CommonArgs<DB, TB> {
  data: META[TB]['update'];
  select: ReadonlyArray<S>;
  where: WhereUniqueInput<DB, META, TB>;
}

export interface UpdateManyArgs<
  DB,
  TB extends keyof DB & string,
  S extends AnyColumn<DB, TB>,
  META extends ORMLessMetadata<DB>,
  RE = WhereInputLHS<DB, TB>
> extends CommonArgs<DB, TB> {
  data: ReadonlyArray<META[TB]['update']>;
  select: ReadonlyArray<S>;
  where: ReadonlyArray<[RE, FilterOperator, ValueExpressionOrList<DB, TB, RE>]>;
}

export interface DeleteOneArgs<
  DB,
  TB extends keyof DB & string,
  S extends AnyColumn<DB, TB>,
  META extends ORMLessMetadata<DB>
> extends CommonArgs<DB, TB> {
  select: ReadonlyArray<S>;
  where: WhereUniqueInput<DB, META, TB>;
}

export interface DeleteManyArgs<
  DB,
  TB extends keyof DB & string,
  S extends AnyColumn<DB, TB>,
  RE = WhereInputLHS<DB, TB>
> extends CommonArgs<DB, TB> {
  select: ReadonlyArray<S>;
  where: ReadonlyArray<[RE, FilterOperator, ValueExpressionOrList<DB, TB, RE>]>;
}
