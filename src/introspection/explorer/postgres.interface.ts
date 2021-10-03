/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/no-namespace */
// 123
export namespace Postgres {
  export namespace InformationSchema {
    export namespace Columns {
      export type Name = 'columns';
      export type Column = keyof Model;

      export interface Model {
        tableCatalog: string;
        tableSchema: string;
        tableName: string;
        columnName: string;
        ordinalPosition: number;
        columnDefault: string;
        isNullable: string;
        dataType: string;
        characterMaximumLength: number;
        characterOctetLength: number;
        numericPrecision: number;
        numericPrecisionRadix: number;
        numericScale: number;
        datetimePrecision: number;
        intervalType: string;
        intervalPrecision: number;
        characterSetCatalog: string;
        characterSetSchema: string;
        characterSetName: string;
        collationCatalog: string;
        collationSchema: string;
        collationName: string;
        domainCatalog: string;
        domainSchema: string;
        domainName: string;
        udtCatalog: string;
        udtSchema: string;
        udtName: string;
        scopeCatalog: string;
        scopeSchema: string;
        scopeName: string;
        maximumCardinality: number;
        dtdIdentifier: string;
        isSelfReferencing: string;
        isIdentity: string;
        identityGeneration: string;
        identityStart: string;
        identityIncrement: string;
        identityMaximum: string;
        identityMinimum: string;
        identityCycle: string;
        isGenerated: string;
        generationExpression: string;
        isUpdatable: string;
      }

      export interface Select extends Required<Model> {}
    }
    export namespace ConstraintColumnUsage {
      export type Name = 'constraint_column_usage';
      export type Column = keyof Model;

      export interface Model {
        tableCatalog: string;
        tableSchema: string;
        tableName: string;
        columnName: string;
        constraintCatalog: string;
        constraintSchema: string;
        constraintName: string;
      }

      export interface Select extends Required<Model> {}
    }
    export namespace KeyColumnUsage {
      export type Name = 'key_column_usage';
      export type Column = keyof Model;

      export interface Model {
        constraintCatalog: string;
        constraintSchema: string;
        constraintName: string;
        tableCatalog: string;
        tableSchema: string;
        tableName: string;
        columnName: string;
        ordinalPosition: number;
        positionInUniqueConstraint: number;
      }

      export interface Select extends Required<Model> {}
    }
    export namespace TableConstraints {
      export type Name = 'table_constraints';
      export type Column = keyof Model;

      export interface Model {
        constraintCatalog: string;
        constraintSchema: string;
        constraintName: string;
        tableCatalog: string;
        tableSchema: string;
        tableName: string;
        constraintType: string;
        isDeferrable: string;
        initiallyDeferred: string;
        enforced: string;
      }

      export interface Select extends Required<Model> {}
    }
    export namespace Tables {
      export type Name = 'tables';
      export type Column = keyof Model;

      export interface Model {
        tableCatalog: string;
        tableSchema: string;
        tableName: string;
        tableType: string;
        selfReferencingColumnName: string;
        referenceGeneration: string;
        userDefinedTypeCatalog: string;
        userDefinedTypeSchema: string;
        userDefinedTypeName: string;
        isInsertableInto: string;
        isTyped: string;
        commitAction: string;
      }

      export interface Select extends Required<Model> {}
    }
  }
  export namespace PgCatalog {
    export namespace PgConstraint {
      export type Name = 'pg_constraint';
      export type Column = keyof Model;

      export type PrimaryKeyConstriant = never;

      export type UniqueConstriants = never;

      export interface WhereUniqueInput {}

      export interface Model {
        oid: number;
        conname: string;
        connamespace: number;
        contype: string;
        condeferrable: boolean;
        condeferred: boolean;
        convalidated: boolean;
        conrelid: number;
        contypid: number;
        conindid: number;
        conparentid: number;
        confrelid: number;
        confupdtype: string;
        confdeltype: string;
        confmatchtype: string;
        conislocal: boolean;
        coninhcount: number;
        connoinherit: boolean;
        conkey: number[];
        confkey: number[];
        conpfeqop: number[];
        conppeqop: number[];
        conffeqop: number[];
        conexclop: number[];
        conbin: string;
      }

      export interface Insert extends Model {}

      export interface Update extends Partial<Insert> {}

      export interface Select extends Required<Model> {}
    }
    export namespace PgEnum {
      export type Name = 'pg_enum';
      export type Column = keyof Model;

      export type PrimaryKeyConstriant = never;

      export type UniqueConstriants = never;

      export interface WhereUniqueInput {}

      export interface Model {
        oid: number;
        enumtypid: number;
        enumsortorder: number;
        enumlabel: string;
      }

      export interface Insert extends Model {}

      export interface Update extends Partial<Insert> {}

      export interface Select extends Required<Model> {}
    }
    export namespace PgNamespace {
      export type Name = 'pg_namespace';
      export type Column = keyof Model;

      export type PrimaryKeyConstriant = never;

      export type UniqueConstriants = never;

      export interface WhereUniqueInput {}

      export interface Model {
        oid: number;
        nspname: string;
        nspowner: number;
        nspacl: string[];
      }

      export interface Insert extends Model {}

      export interface Update extends Partial<Insert> {}

      export interface Select extends Required<Model> {}
    }
    export namespace PgType {
      export type Name = 'pg_type';
      export type Column = keyof Model;

      export type PrimaryKeyConstriant = never;

      export type UniqueConstriants = never;

      export interface WhereUniqueInput {}

      export interface Model {
        oid: number;
        typname: string;
        typnamespace: number;
        typowner: number;
        typlen: number;
        typbyval: boolean;
        typtype: string;
        typcategory: string;
        typispreferred: boolean;
        typisdefined: boolean;
        typdelim: string;
        typrelid: number;
        typelem: number;
        typarray: number;
        typinput: string;
        typoutput: string;
        typreceive: string;
        typsend: string;
        typmodin: string;
        typmodout: string;
        typanalyze: string;
        typalign: string;
        typstorage: string;
        typnotnull: boolean;
        typbasetype: number;
        typtypmod: number;
        typndims: number;
        typcollation: number;
        typdefaultbin: string;
        typdefault: string;
        typacl: string[];
      }

      export interface Insert extends Model {}

      export interface Update extends Partial<Insert> {}

      export interface Select extends Required<Model> {}
    }
  }
}

export interface PostgresSchema {
  columns: Postgres.InformationSchema.Columns.Select;
  constraintColumnUsage: Postgres.InformationSchema.ConstraintColumnUsage.Select;
  keyColumnUsage: Postgres.InformationSchema.KeyColumnUsage.Select;
  tableConstraints: Postgres.InformationSchema.TableConstraints.Select;
  tables: Postgres.InformationSchema.Tables.Select;
  pgConstraint: Postgres.PgCatalog.PgConstraint.Select;
  pgEnum: Postgres.PgCatalog.PgEnum.Select;
  pgNamespace: Postgres.PgCatalog.PgNamespace.Select;
  pgType: Postgres.PgCatalog.PgType.Select;
}
