import * as cases from 'change-case';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as path from 'path';
import { guard } from '../utils';
import { Explorer } from './explorer';
import { ConfigSchema } from './schema';

export class Introspection {
  readonly #config: ConfigSchema;

  constructor(config: ConfigSchema) {
    this.#config = ConfigSchema.create(config);
  }

  async introspect() {
    const explorer = new Explorer(this.#config);
    const definitions = await explorer.getDefinitions();

    const schemas: SchemaModel[] = Object.keys(this.#config.database).map((schema) => ({
      isInSearchPath: this.#config.searchPaths.includes(schema),
      schemaName: this.convertStringCase(schema),
      schemaEnums: definitions.enums
        .filter((enums) => enums.enumSchema === schema)
        .map((enums) => ({
          enumName: this.convertStringCase(enums.enumName),
          enumValues: enums.enumValues,
        })),

      schemaTables: definitions.tables
        .filter((table) => table.tableSchema === schema)
        .filter((table) => table.tableType === 'BASE TABLE')
        .map((table) => {
          const schemaSetting = this.#config.database[table.tableSchema];

          const tableSetting = schemaSetting.tables?.[table.tableName];

          const constraints = definitions.constraints
            .filter((constraint) => constraint.constraintSchema === table.tableSchema)
            .filter((constraint) => constraint.constraintTable === table.tableName)
            .map((constraint) => {
              const constraintSetting = tableSetting?.constriants?.[constraint.constraintName];
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
            .filter((column) => column.tableSchema === table.tableSchema)
            .filter((column) => column.tableName === table.tableName)
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
            tablePrimaryConstraint: constraints.find((c) => c.constraintType === 'p'),
            tableUniqueConstraints: constraints.filter((c) => c.constraintType === 'u' || c.constraintType === 'p'),
            tableForeignConstraints: constraints.filter((c) => c.constraintType === 'f'),
            tableColumns: columns,
          };
        })
        .filter(guard.isDefined),

      schemaViews: definitions.tables
        .filter((table) => table.tableSchema === schema)
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
    console.log(__dirname);

    handlebars.registerPartial(
      'generateSchema',
      fs.readFileSync(path.join(__dirname, '../templates/partials/schema.handlebars'), 'utf-8')
    );
    handlebars.registerPartial(
      'generateTableRepository',
      fs.readFileSync(path.join(__dirname, '../templates/partials/table-repository.handlebars'), 'utf-8')
    );
    handlebars.registerPartial(
      'generateViewRepository',
      fs.readFileSync(path.join(__dirname, '../templates/partials/view-repository.handlebars'), 'utf-8')
    );

    const templates = await Promise.all(
      Object.entries(this.#config.generate).map(
        ([key, { namespace, root, template, repository }]) =>
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
                    repository,
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
    if (this.#config.types && this.#config.types[udtName]) {
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
  tablePrimaryConstraint?: TableConstrainModel;
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
