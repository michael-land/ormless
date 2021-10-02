import { KyselyConfig } from 'kysely';

export interface TableDefinition {
  tableSchema: string;
  tableName: string;
  tableType: 'VIEW' | 'BASE TABLE';
  isMutable: string;
}
export interface ColumnDefinition {
  tableSchema: string;
  tableName: string;
  columnName: string;
  columnPosition: string;
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

export interface ExplorerDefinition {
  tables: TableDefinition[];
  columns: ColumnDefinition[];
  enums: EnumDefinition[];
  constraints: ConstraintDefinition[];
}

export interface ExplorerConfig extends Omit<KyselyConfig, 'plugins'> {
  schemas: string[];
}

export interface ExplorerInterface {
  getTableDefinitions: () => Promise<TableDefinition[]>;
  getColumnDefinitions: () => Promise<ColumnDefinition[]>;
  getConstraintDefinitions: () => Promise<ConstraintDefinition[]>;
  getEnumDefinitions: () => Promise<EnumDefinition[]>;
}
