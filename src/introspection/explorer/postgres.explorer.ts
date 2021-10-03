import { guard } from '../../utils';
import { ExplorerConfig, ExplorerMethods, ExplorerMethodsArgs } from './explorer';
import { PostgresSchema } from './postgres.interface';

enum PgTypeType {
  Base = 'b',
  Composite = 'c',
  Domain = 'd',
  Enum = 'e',
  Pseudo = 'p',
  Range = 'r',
}

export class PostgresExplorer implements ExplorerMethods<PostgresSchema> {
  readonly #includedSchemas: string[];
  readonly #includedTables: string[];

  constructor({ database }: Pick<ExplorerConfig, 'database'>) {
    this.#includedSchemas = Object.keys(database);
    this.#includedTables = [
      ...new Set(
        Object.values(database)
          .filter(guard.isObject)
          .map((x) => x.tables)
          .filter(guard.isDefined)
          .flatMap((x) => Object.entries(x).map(([k, v]) => (v !== false ? k : undefined)))
          .filter(guard.isDefined)
      ),
    ];
  }

  async getTableDefinitions({ db }: ExplorerMethodsArgs<PostgresSchema>) {
    let qb = db
      .selectFrom('tables')
      .select(['tableSchema', 'tableName', 'tableType', 'isInsertableInto'])
      .orderBy('tableName');

    if (this.#includedSchemas.length) {
      qb = qb.where('tableSchema', 'in', this.#includedSchemas);
    }
    if (this.#includedTables.length) {
      qb = qb.where('tableName', 'in', this.#includedTables);
    }
    return qb.execute();
  }

  async getConstraintDefinitions({ db }: ExplorerMethodsArgs<PostgresSchema>) {
    let qb = db
      .selectFrom('pgConstraint')
      .leftJoin('constraintColumnUsage', (join) =>
        join
          .onRef('conname', '=', 'constraintName')
          .onRef(db.raw('connamespace::regnamespace'), '=', db.raw('constraint_schema::regnamespace'))
      )
      .select([
        'conname',
        'contype',
        'tableSchema',
        'tableName',
        db.raw<string[]>('array_agg(column_name)::text[]').as('columns'),
      ])
      .where('conrelid', '<>', 0)
      .groupBy(['conname', 'contype', 'tableSchema', 'tableName']);

    if (this.#includedSchemas.length) {
      qb = qb.where('tableSchema', 'in', this.#includedSchemas);
    }
    if (this.#includedTables.length) {
      qb = qb.where('tableName', 'in', this.#includedTables);
    }

    const constraints = await qb.execute();
    return constraints.map((constraint) => ({
      constraintName: constraint.conname,
      constraintType: constraint.contype,
      constraintSchema: constraint.tableSchema,
      constraintTable: constraint.tableName,
      columns: constraint.columns,
    }));
  }

  async getEnumDefinitions({ db }: ExplorerMethodsArgs<PostgresSchema>) {
    let qb = db
      .selectFrom('pgType')
      .innerJoin('pgEnum', 'pgEnum.enumtypid', 'pgType.oid')
      .innerJoin('pgNamespace', 'pgNamespace.oid', 'pgType.typnamespace')
      .select([
        'pgNamespace.nspname as enumSchema',
        'pgType.typname as enumName',
        db.raw<string[]>('array_agg(enumlabel)::text[]').as('enumValues'),
      ])
      .groupBy(['pgNamespace.nspname', 'pgType.typname']);

    if (this.#includedSchemas.length) {
      qb = qb.where('pgNamespace.nspname', 'in', this.#includedSchemas);
    }

    return qb.execute();
  }

  async getColumnDefinitions({ db }: ExplorerMethodsArgs<PostgresSchema>) {
    let qbConstraints = db
      .selectFrom('tableConstraints')
      .innerJoin('keyColumnUsage', (join) =>
        join
          .onRef('keyColumnUsage.tableName', '=', 'tableConstraints.tableName')
          .onRef('keyColumnUsage.tableSchema', '=', 'tableConstraints.tableSchema')
          .onRef('keyColumnUsage.constraintName', '=', 'tableConstraints.constraintName')
      )
      .select([
        'tableConstraints.tableSchema',
        'tableConstraints.tableName',
        'tableConstraints.constraintType',
        'tableConstraints.constraintName',
        'keyColumnUsage.columnName',
      ]);

    if (this.#includedSchemas.length) {
      qbConstraints = qbConstraints.where('tableConstraints.tableSchema', 'in', this.#includedSchemas);
    }
    if (this.#includedTables.length) {
      qbConstraints = qbConstraints.where('tableConstraints.tableName', 'in', this.#includedTables);
    }

    const constraints = await qbConstraints.execute();

    const udtNameWithoutArrayPrefixSQL = `
      CASE WHEN data_type = 'ARRAY' THEN
          TRIM(LEADING '_' FROM "information_schema"."columns".udt_name)
        ELSE "information_schema"."columns".udt_name
      END`;

    const qbColumns = db
      .selectFrom('columns')
      .leftJoin('pgType', (join) =>
        join
          .onRef('pgType.typname', '=', db.raw(udtNameWithoutArrayPrefixSQL))
          .onRef(
            db.raw('pg_type.typnamespace::regnamespace'),
            '=',
            db.raw('information_schema.columns.table_schema::regnamespace')
          )
      )
      .select([
        'columns.tableSchema',
        'columns.tableName',
        'columns.dataType',
        'columns.columnName',
        'columns.ordinalPosition',
        'columns.columnDefault',
        db.raw<string>(udtNameWithoutArrayPrefixSQL).as('udtName'),
        'columns.isNullable',
        'columns.isIdentity',
        'columns.isGenerated',
        'pgType.typtype',
      ])

      .orderBy('tableName', 'asc')
      .orderBy('ordinalPosition', 'asc');

    if (this.#includedSchemas.length) {
      qbConstraints = qbConstraints.where('tableSchema', 'in', this.#includedSchemas);
    }
    if (this.#includedTables.length) {
      qbConstraints = qbConstraints.where('tableName', 'in', this.#includedTables);
    }

    const columns = await qbColumns.execute();

    return columns.map((column) => ({
      tableSchema: column.tableSchema,
      tableName: column.tableName,
      columnName: column.columnName,
      columnPosition: column.ordinalPosition,
      columnDefault: column.columnDefault,
      columnType: column.udtName,
      isPrimaryKey:
        constraints.find(
          (cc) =>
            cc.tableSchema === column.tableSchema &&
            cc.tableName === column.tableName &&
            cc.columnName === column.columnName
        )?.constraintType === 'PRIMARY KEY',
      isNullable: column.isNullable === 'YES',
      isIdentity: column.isIdentity === 'YES',
      isGenerated: column.isGenerated === 'ALWAYS',
      isEnum: column.typtype === PgTypeType.Enum,
      isArray: column.dataType === 'ARRAY',
    }));
  }
}
