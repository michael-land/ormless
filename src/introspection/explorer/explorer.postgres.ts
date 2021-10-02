import { CamelCasePlugin, Kysely } from 'kysely';
import {
  ColumnDefinition,
  ConstraintDefinition,
  EnumDefinition,
  ExplorerConfig,
  ExplorerInterface,
  TableDefinition,
} from './explorer.interface';

export class PostgresExplorer implements ExplorerInterface {
  readonly #db: Kysely<PostgresSchema>;
  readonly #schemas: string[];

  constructor({ schemas, ...driverConfig }: ExplorerConfig) {
    this.#db = new Kysely({
      ...driverConfig,
      dialect: 'postgres' as const,
      plugins: [new CamelCasePlugin()],
    });
    this.#schemas = schemas;
  }

  async getTableDefinitions(): Promise<TableDefinition[]> {
    return await this.#db
      .selectFrom('informationSchema.tables')
      .select(['tableSchema', 'tableName', 'tableType', 'isInsertableInto as isMutable'])
      .where('tableSchema', 'in', this.#schemas)
      .orderBy('tableName')
      .execute();
  }

  async getColumnDefinitions(): Promise<ColumnDefinition[]> {
    const columnConstraints = await this.#db
      .selectFrom('informationSchema.tableConstraints')
      .innerJoin('informationSchema.keyColumnUsage', (join) =>
        join
          .onRef('informationSchema.keyColumnUsage.tableName', '=', 'informationSchema.tableConstraints.tableName')
          .onRef('informationSchema.keyColumnUsage.tableSchema', '=', 'informationSchema.tableConstraints.tableSchema')
          .onRef(
            'informationSchema.keyColumnUsage.constraintName',
            '=',
            'informationSchema.tableConstraints.constraintName'
          )
      )
      .select([
        'informationSchema.tableConstraints.tableSchema',
        'informationSchema.tableConstraints.tableName',
        'informationSchema.tableConstraints.constraintType',
        'informationSchema.tableConstraints.constraintName',
        'informationSchema.keyColumnUsage.columnName',
      ])
      .where('informationSchema.tableConstraints.tableSchema', 'in', this.#schemas)
      .execute();

    const udtNameWithoutArrayPrefixSQL = `
    CASE WHEN data_type = 'ARRAY' THEN
        TRIM(LEADING '_' FROM "information_schema"."columns".udt_name)
      ELSE "information_schema"."columns".udt_name
    END`;

    const columns = await this.#db
      .selectFrom('informationSchema.columns')
      .leftJoin('pg_catalog.pgType', (join) =>
        join
          .onRef('pg_catalog.pgType.typname', '=', this.#db.raw(udtNameWithoutArrayPrefixSQL))
          .onRef(
            this.#db.raw('pg_catalog.pg_type.typnamespace::regnamespace'),
            '=',
            this.#db.raw('information_schema.columns.table_schema::regnamespace')
          )
      )
      .select([
        'informationSchema.columns.tableSchema',
        'informationSchema.columns.tableName',
        'informationSchema.columns.dataType',
        'informationSchema.columns.columnName',
        'informationSchema.columns.ordinalPosition',
        'informationSchema.columns.columnDefault',
        this.#db.raw<string>(udtNameWithoutArrayPrefixSQL).as('udtName'),
        'informationSchema.columns.isNullable',
        'informationSchema.columns.isIdentity',
        'informationSchema.columns.isGenerated',
        'pg_catalog.pgType.typtype',
      ])
      .where('tableSchema', 'in', this.#schemas)
      .orderBy('tableName', 'asc')
      .orderBy('ordinalPosition', 'asc')
      .execute();

    return columns.map((column) => ({
      tableSchema: column.tableSchema,
      tableName: column.tableName,
      columnName: column.columnName,
      columnPosition: column.ordinalPosition,
      columnDefault: column.columnDefault,
      columnType: column.udtName,
      isPrimaryKey:
        columnConstraints.find(
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

  async getConstraintDefinitions(): Promise<ConstraintDefinition[]> {
    return this.#db
      .selectFrom('pg_catalog.pgConstraint')
      .select([
        this.#db.raw<string>('connamespace::regnamespace').as('constraintSchema'),
        this.#db.raw<string>('conrelid::regclass').as('constraintTable'),
        'conname as constraintName',
        'contype as constraintType',
      ])
      .where('conrelid', '<>', '0')
      .where(
        this.#db.raw('connamespace::regnamespace'),
        '=',
        this.#db.raw(`ANY ('{${this.#schemas.join(',')}}'::REGNAMESPACE[])`)
      )
      .execute();
  }

  async getEnumDefinitions(): Promise<EnumDefinition[]> {
    return this.#db
      .selectFrom('pg_catalog.pgType')
      .innerJoin('pg_catalog.pgEnum', 'pg_catalog.pgEnum.enumtypid', 'pg_catalog.pgType.oid')
      .innerJoin('pg_catalog.pgNamespace', 'pg_catalog.pgNamespace.oid', 'pg_catalog.pgType.typnamespace')
      .select([
        'pg_catalog.pgNamespace.nspname as enumSchema',
        'pg_catalog.pgType.typname as enumName',
        this.#db.raw<string[]>('array_agg(enumlabel)::text[]').as('enumValues'),
      ])
      .where('pg_catalog.pgNamespace.nspname', 'in', this.#schemas)
      .groupBy(['pg_catalog.pgNamespace.nspname', 'pg_catalog.pgType.typname'])
      .execute();
  }
}

type YesNoEnum = 'YES' | 'NO';

enum PgTypeType {
  Base = 'b',
  Composite = 'c',
  Domain = 'd',
  Enum = 'e',
  Pseudo = 'p',
  Range = 'r',
}

interface PostgresInformationSchema {
  'informationSchema.tables': {
    commitAction: string;
    isInsertableInto: string;
    isTyped: string;
    referenceGeneration: string;
    selfReferencingColumnName: string;
    tableCatalog: string;
    tableName: string;
    tableSchema: string;
    tableType: 'BASE TABLE' | 'VIEW';
    userDefinedTypeCatalog: string;
    userDefinedTypeName: string;
    userDefinedTypeSchema: string;
  };
  'informationSchema.tableConstraints': {
    constraintCatalog: string;
    constraintName: string;
    constraintSchema: string;
    constraintType: string;
    enforced: string;
    initiallyDeferred: string;
    isDeferrable: string;
    tableCatalog: string;
    tableName: string;
    tableSchema: string;
  };
  'informationSchema.keyColumnUsage': {
    columnName: string;
    constraintCatalog: string;
    constraintName: string;
    constraintSchema: string;
    ordinalPosition: string;
    positionInUniqueConstraint: string;
    tableCatalog: string;
    tableName: string;
    tableSchema: string;
  };
  'informationSchema.columns': {
    characterMaximumLength: string;
    characterOctetLength: string;
    characterSetCatalog: string;
    characterSetName: string;
    characterSetSchema: string;
    collationCatalog: string;
    collationName: string;
    collationSchema: string;
    columnDefault: string;
    columnName: string;
    dataType: string;
    datetimePrecision: string;
    domainCatalog: string;
    domainName: string;
    domainSchema: string;
    dtdIdentifier: string;
    generationExpression: string;
    identityCycle: string;
    identityGeneration: string;
    identityIncrement: string;
    identityMaximum: string;
    identityMinimum: string;
    identityStart: string;
    intervalPrecision: string;
    intervalType: string;
    isGenerated: 'ALWAYS' | 'NEVER';
    isIdentity: YesNoEnum;
    isNullable: YesNoEnum;
    isSelfReferencing: YesNoEnum;
    isUpdatable: YesNoEnum;
    maximumCardinality: string;
    numericPrecision: string;
    numericPrecisionRadix: string;
    numericScale: string;
    ordinalPosition: string;
    scopeCatalog: string;
    scopeName: string;
    scopeSchema: string;
    tableCatalog: string;
    tableName: string;
    tableSchema: string;
    udtCatalog: string;
    udtName: string;
    udtSchema: string;
  };
}
interface PostgresCatalogSchema {
  'pg_catalog.pgNamespace': {
    nspacl: string;
    nspname: string;
    nspowner: string;
    oid: string;
  };
  'pg_catalog.pgEnum': {
    enumlabel: string;
    enumsortorder: string;
    enumtypid: string;
    oid: string;
  };
  'pg_catalog.pgType': {
    oid: string;
    typacl: string;
    typalign: string;
    typanalyze: string;
    typarray: string;
    typbasetype: string;
    typbyval: string;
    typcategory: string;
    typcollation: string;
    typdefault: string;
    typdefaultbin: string;
    typdelim: string;
    typelem: string;
    typinput: string;
    typisdefined: string;
    typispreferred: string;
    typlen: string;
    typmodin: string;
    typmodout: string;
    typname: string;
    typnamespace: string;
    typndims: string;
    typnotnull: string;
    typoutput: string;
    typowner: string;
    typreceive: string;
    typrelid: string;
    typsend: string;
    typstorage: string;
    typtype: PgTypeType;
    typtypmod: string;
  };

  'pg_catalog.pgConstraint': {
    conbin: string;
    condeferrable: string;
    condeferred: string;
    conexclop: string;
    confdeltype: string;
    conffeqop: string;
    confkey: string;
    confmatchtype: string;
    confrelid: string;
    confupdtype: string;
    conindid: string;
    coninhcount: string;
    conislocal: string;
    conkey: string;
    conname: string;
    connamespace: string;
    connoinherit: string;
    conparentid: string;
    conpfeqop: string;
    conppeqop: string;
    conrelid: string;
    contype: string;
    contypid: string;
    convalidated: string;
    oid: string;
  };
}

interface PostgresSchema extends PostgresCatalogSchema, PostgresInformationSchema {}
