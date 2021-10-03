import * as cases from 'change-case';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { guard } from '../utils';
import { Explorer, ExplorerConfig } from './explorer';

export interface IntrospectionConfig extends ExplorerConfig {
  paths: string[];
  types: Record<string, string>;
  generate: Record<
    string,
    {
      template: string;
      folder: string;
      root?: string;
      namespace?: 'always' | 'never' | 'auto';
    }
  >;
}

export class Introspection {
  readonly #config: IntrospectionConfig;

  constructor(config: IntrospectionConfig) {
    this.#config = config;
  }

  async introspect() {
    const explorer = new Explorer(this.#config);
    const definitions = await explorer.getDefinitions();

    const schemas: SchemaModel[] = Object.keys(this.#config.database).map((schema) => ({
      isInSearchPath: this.#config.paths.includes(schema),
      schemaName: this.convertStringCase(schema),
      schemaEnums: definitions.enums.map((enums) => ({
        enumName: this.convertStringCase(enums.enumName),
        enumValues: enums.enumValues,
      })),

      schemaTables: definitions.tables
        .filter((table) => table.tableType === 'BASE TABLE')
        .map((table) => {
          const schemaSetting = this.#config.database[table.tableSchema];

          if (schemaSetting === false) {
            return;
          }

          const tableSetting = schemaSetting.tables?.[table.tableName];

          if (tableSetting === false) {
            return;
          }

          const constraints = definitions.constraints
            .filter(
              (constraint) =>
                constraint.constraintSchema === table.tableSchema && constraint.constraintTable === table.tableName
            )
            .map((constraint) => {
              const constraintSetting = tableSetting?.constriants?.[constraint.constraintName];
              if (constraintSetting === false) {
                return;
              }
              return {
                constraintName: this.convertStringCase(constraint.constraintName),
                constraintAbbr: constraintSetting?.name,
                constraintType: constraint.constraintType,
                constraintTypescriptType: constraint.columns
                  .map((x) => cases.camelCase(x))
                  .map((x) => `'${x}'`)
                  .join('|'),
              };
            })
            .filter(guard.isDefined);

          const columns = definitions.columns
            .filter((column) => column.tableSchema === table.tableSchema && column.tableName === table.tableName)
            .map((column) => {
              let typescriptType = this.getTypescriptType(column.columnType);

              if (column.isEnum) {
                typescriptType = cases.constantCase(typescriptType);
              }
              if (column.isArray) {
                typescriptType = `${typescriptType}[]`;
              }

              return {
                columnName: this.convertStringCase(column.columnName),
                columnType: typescriptType,
                isOptional: !!column.columnDefault || column.isIdentity || column.isGenerated,
                isNullable: column.isNullable,
                isIdentity: column.isIdentity,
                isGenerated: column.isGenerated,
                isArray: column.isArray,
                isEnum: column.isEnum,
                isPrimaryKey: column.isPrimaryKey,
              };
            });

          return {
            tableName: this.convertStringCase(table.tableName),
            tablePrimaryConstraints: constraints.filter((c) => c.constraintType === 'p'),
            tableUniqueConstraints: constraints.filter((c) => c.constraintType === 'u' || c.constraintType === 'p'),
            tableForeignConstraints: constraints.filter((c) => c.constraintType === 'f'),
            tableColumns: columns,
          };
        })
        .filter(guard.isDefined),

      schemaViews: definitions.tables
        .filter((table) => table.tableType === 'VIEW')
        .map((table) => {
          const columns = definitions.columns
            .filter((column) => column.tableSchema === table.tableSchema && column.tableName === table.tableName)
            .map((column) => {
              let typescriptType = this.getTypescriptType(column.columnType);

              if (column.isEnum) {
                typescriptType = cases.constantCase(typescriptType);
              }
              if (column.isArray) {
                typescriptType = `${typescriptType}[]`;
              }

              return {
                columnName: this.convertStringCase(column.columnName),
                columnType: typescriptType,
                isOptional: !!column.columnDefault || column.isIdentity || column.isGenerated,
                isNullable: column.isNullable,
                isIdentity: column.isIdentity,
                isGenerated: column.isGenerated,
                isArray: column.isArray,
                isEnum: column.isEnum,
                isPrimaryKey: column.isPrimaryKey,
              };
            });

          return {
            viewName: this.convertStringCase(table.tableName),
            viewColumns: columns,
          };
        })
        .filter(guard.isDefined),
    }));

    const templates = await Promise.all(
      Object.entries(this.#config.generate).map(
        ([key, { template, root = 'Database', namespace = 'auto' }]) =>
          new Promise<[string, string]>((resolve, reject) =>
            fs.readFile(template, { encoding: 'utf-8' }, (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve([
                  key,
                  handlebars.compile(data)({
                    schemas,
                    root,
                    withNamespace:
                      namespace !== 'never' && namespace === 'auto' && Object.keys(this.#config.database).length > 1,
                  }),
                ]);
              }
            })
          )
      )
    );
    return Object.fromEntries(templates);
  }

  private getTypescriptType(udtName: string): string {
    if (this.#config.types[udtName]) {
      return this.#config.types[udtName];
    }

    switch (udtName) {
      case 'bpchar':
      case 'char':
      case 'varchar':
      case 'text':
      case 'citext':
      case 'character varying':
      case 'character':
      case 'uuid':
      case 'bytea':
      case 'inet':
      case 'citext':
      case 'hstore':
      case 'time':
      case 'timetz':
      case 'interval':
      case 'name': {
        return 'string';
      }

      case 'integer':
      case 'int2':
      case 'int4':
      case 'int8':
      case 'float4':
      case 'float8':
      case 'double precision':
      case 'decimal':
      case 'numeric':
      case 'real':
      case 'money':
      case 'oid': {
        return 'number';
      }

      case 'bool':
      case 'boolean': {
        return 'boolean';
      }

      case 'json':
      case 'jsonb': {
        return 'any';
      }

      case 'date':
      case 'timestamp':
      case 'timestamptz': {
        return 'Date | string';
      }

      case 'tsvector': {
        return 'string';
      }

      default: {
        return udtName;
      }
    }
  }

  convertStringCase(value: string) {
    return {
      original: value,
      camelCase: cases.camelCase(value),
      constantCase: cases.constantCase(value),
      dotCase: cases.dotCase(value),
      paramCase: cases.paramCase(value),
      pascalCase: cases.pascalCase(value),
      snakeCase: cases.snakeCase(value),
    };
  }
}

interface NameMap {
  original: string;
  camelCase: string;
  constantCase: string;
  dotCase: string;
  paramCase: string;
  pascalCase: string;
  snakeCase: string;
}

interface SchemaModel {
  schemaName: NameMap;
  isInSearchPath: boolean;
  schemaTables: TableModel[];
  schemaViews: ViewModel[];
  schemaEnums: EnumModel[];
}

interface EnumModel {
  enumName: NameMap;
  enumValues: string[];
}

interface ViewModel {
  viewName: NameMap;
  viewColumns: TableColumnModel[];
}

interface TableModel {
  tableName: NameMap;
  tablePrimaryConstraints: TableConstrainModel[];
  tableForeignConstraints: TableConstrainModel[];
  tableUniqueConstraints: TableConstrainModel[];
  tableColumns: TableColumnModel[];
}

interface TableConstrainModel {
  constraintName: NameMap;
  constraintAbbr: string | undefined;
  constraintType: string;
  constraintTypescriptType: string;
}

interface TableColumnModel {
  columnName: NameMap;
  columnType: string;
  isOptional: boolean;
  isNullable: boolean;
  isIdentity: boolean;
  isGenerated: boolean;
  isArray: boolean;
  isEnum: boolean;
  isPrimaryKey: boolean;
}
