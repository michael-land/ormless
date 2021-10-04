import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';
import * as yargs from 'yargs';
import { Introspection } from '../introspection/introspection';
import { ConfigSchema } from '../introspection/schema';
import { guard } from '../utils';

const argv = yargs(process.argv.slice(2))
  .options({
    c: {
      type: 'string',
      alias: 'config',
      description: 'Config File',
      demandOption: true,
      default: './ormless.config.json',
    },
  })
  .parseSync();

const argvConfig = JSON.parse(fs.readFileSync(argv.c, 'utf8')) as CliConfig;

export interface CliConfig extends ConfigSchema {
  prettier?: string | Partial<prettier.RequiredOptions> | null;
}

export async function cli(config: CliConfig = argvConfig) {
  const introspection = new Introspection(config);
  const output = await measure('introspect', () => introspection.introspect());

  const prettierConfig = guard.isObject(config.prettier)
    ? config.prettier
    : await prettier.resolveConfig(config.prettier || '.prettierrc');

  const generated = measure('generate', () =>
    Object.entries(output).map(([key, value]) => {
      const setting = config.generate[key];
      const fileName = `${key}.ts`;
      const directory = setting.folder ?? '.';
      const outFile = path.join(directory, fileName);

      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true });
      }

      fs.writeFileSync(
        outFile,
        prettier.format(value, { parser: 'typescript', ...prettierConfig })
      );
    })
  );

  return generated;
}

async function measure<T extends (...args: any) => any>(
  label: string,
  cb: T
): Promise<ReturnType<T>> {
  try {
    console.time(label);
    return await cb();
  } catch (error) {
    throw error;
  } finally {
    console.timeEnd(label);
  }
}
