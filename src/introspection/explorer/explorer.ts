import { CamelCasePlugin, Kysely } from 'kysely';
import { guard } from '../../utils';
import { ConfigSchema } from '../schema';
import { PostgresExplorer } from './postgres.explorer';

export class Explorer {
  #config: ConfigSchema;

  constructor(config: ConfigSchema) {
    this.#config = config;
  }

  async getDefinitions() {
    const instance =
      this.#config.connection.dialect === 'postgres' ? new PostgresExplorer(this.#config) : null;

    guard.assertNonNullable(instance);

    const db = new Kysely({
      ...this.#config.connection,
      plugins: [new CamelCasePlugin()],
    });

    const [columns, enums, tables, constraints] = await db.transaction(async (db) => {
      await db.raw(`SET search_path TO information_schema, pg_catalog`).execute();
      return Promise.all([
        instance.getColumnDefinitions({ db }),
        instance.getEnumDefinitions({ db }),
        instance.getTableDefinitions({ db }),
        instance.getConstraintDefinitions({ db }),
      ]);
    });

    await db.destroy();
    return { columns, enums, tables, constraints };
  }
}

export interface TableDefinition {
  tableSchema: string;
  tableName: string;
  tableType: string;
  isInsertableInto: string;
}
export interface ColumnDefinition {
  tableSchema: string;
  tableName: string;
  columnName: string;
  columnPosition: number;
  columnDefault: string;
  columnType: string;
  isPrimaryKey: boolean;
  isNullable: boolean;
  isIdentity: boolean;
  isGenerated: boolean;
  isArray: boolean;
  isEnum: boolean;
}

export interface ConstraintDefinition {
  constraintSchema: string;
  constraintTable: string;
  constraintName: string;
  constraintType: string;
}

export interface EnumDefinition {
  enumSchema: string;
  enumName: string;
  enumValues: string[];
}

export interface ExplorerMethodsArgs<T> {
  db: Kysely<T>;
}
export interface ExplorerMethods<T> {
  getTableDefinitions: (args: ExplorerMethodsArgs<T>) => Promise<TableDefinition[]>;
  getColumnDefinitions: (args: ExplorerMethodsArgs<T>) => Promise<ColumnDefinition[]>;
  getConstraintDefinitions: (args: ExplorerMethodsArgs<T>) => Promise<ConstraintDefinition[]>;
  getEnumDefinitions: (args: ExplorerMethodsArgs<T>) => Promise<EnumDefinition[]>;
}
