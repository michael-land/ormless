import * as path from 'path';
import { array, defaulted, enums, Infer, object, optional, record, string } from 'superstruct';

const CustomTypeSchema = record(string(), string());

const ColumnConfigSchema = object({
  name: optional(string()),
  type: optional(string()),
});

const ConstriantConfigSchema = object({
  name: string(),
});

const TableConfigSchema = object({
  columns: optional(record(string(), ColumnConfigSchema)),
  constriants: optional(record(string(), ConstriantConfigSchema)),
});

const SchemaConfigSchema = object({
  tables: optional(record(string(), TableConfigSchema)),
  types: defaulted(CustomTypeSchema, {}),
});

const ConnectionConfigSchema = object({
  database: string(),
  host: string(),
  user: optional(string()),
  password: optional(string()),
  dialect: enums(['postgres'] as const),
});

const GenerateConfigSchema = object({
  repository: optional(
    object({
      import: defaulted(object({ name: string(), path: string() }), {
        name: 'ORMLess',
        path: 'ormless',
      }),
    })
  ),
  folder: defaulted(string(), ''),
  root: defaulted(string(), 'Database'),
  namespace: defaulted(string(), 'auto'),
  template: defaulted(string(), path.join(__dirname, '../templates/template.handlebars')),
});

export type ConfigSchema = Infer<typeof ConfigSchema>;
export const ConfigSchema = object({
  database: record(string(), SchemaConfigSchema),
  generate: record(string(), GenerateConfigSchema),
  connection: ConnectionConfigSchema,
  types: defaulted(CustomTypeSchema, {}),
  searchPaths: defaulted(array(string()), ['public']),
});
