import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import { Introspection, IntrospectionConfig } from '../introspection/introspection';

export interface CliConfig extends IntrospectionConfig {
  prettier?: prettier.RequiredOptions;
}

export async function cli(config: CliConfig) {
  const introspection = new Introspection(config);
  const output = await introspection.introspect();

  return Object.entries(output).map(([key, value]) => {
    const setting = config.generate[key];
    const fileName = `${key}.ts`;
    const directory = setting.folder ?? '.';
    const outFile = path.join(directory, fileName);

    fs.writeFileSync(
      outFile,
      prettier.format(value, {
        parser: 'typescript',
        ...config.prettier,
      })
    );
  });
}
