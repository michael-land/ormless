import * as cases from 'change-case';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import { KyselyConfig } from 'kysely';
import { asserts } from '../utils';
import { Explorer } from './explorer';

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
  tables: TableModel[];
  enums: EnumModel[];
  isInPath: boolean;
}

interface EnumModel {
  enumName: NameMap;
  enumValues: string[];
}

interface TableModel {
  tableName: NameMap;
  tableType: string;
  isView: boolean;
  hasPrimaryKey: boolean;
  columns: TableColumnModel[];
  constraints: TableConstrainModel[];
  pk: string;
}

interface TableConstrainModel {
  constraintName: NameMap;
  constraintType: string;
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

export interface IntrospectionConfig extends Omit<KyselyConfig, 'plugins'> {
  schemas: string[];
  template: { client?: string; type: string };
  types: Record<string, string>;
}

export class Introspection {
  readonly #config: IntrospectionConfig;

  constructor(config: IntrospectionConfig) {
    this.#config = config;
  }

  async introspect() {
    const explorer = new Explorer(this.#config);
    const definitions = await explorer.getDefinitions();

    const schemas: SchemaModel[] = this.#config.schemas.map((schema) => ({
      isInPath: schema === 'public',
      schemaName: this.convertStringCase(schema),
      enums: [],
      tables: [],
    }));

    for (const table of definitions.tables) {
      const schema = schemas.find((schema) => schema.schemaName.original === table.tableSchema);
      asserts.assertNonNullable(schema);

      const constraints = definitions.constraints.filter(
        (constraint) =>
          constraint.constraintSchema === table.tableSchema && constraint.constraintTable === table.tableName
      );

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
      const primaryColumns = columns.filter((x) => x.isPrimaryKey);
      schema.tables.push({
        tableName: this.convertStringCase(table.tableName),
        tableType: table.tableType,
        isView: table.tableType === 'VIEW',
        hasPrimaryKey: constraints.some((c) => c.constraintType === 'p'),
        constraints: constraints.map((c) => ({
          constraintName: this.convertStringCase(c.constraintName),
          constraintType: c.constraintType,
        })),
        pk: primaryColumns.length
          ? primaryColumns
              .map((x) => x.columnName.camelCase)
              .map((x) => `'${x}'`)
              .join('|')
          : 'never',
        columns,
      });
    }

    for (const enums of definitions.enums) {
      const schema = schemas.find((schema) => schema.schemaName.original === enums.enumSchema);
      asserts.assertNonNullable(schema);

      schema.enums.push({
        enumName: this.convertStringCase(enums.enumName),
        enumValues: enums.enumValues,
      });
    }

    const templates = await Promise.all(
      Object.entries(this.#config.template).map(
        ([key, value]) =>
          new Promise<[string, string]>((resolve, reject) =>
            fs.readFile(value, { encoding: 'utf-8' }, (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve([key, handlebars.compile(data)({ schemas })]);
              }
            })
          )
      )
    );
    console.log(Object.fromEntries(templates));
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
