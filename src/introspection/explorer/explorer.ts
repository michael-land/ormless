import { ORMLessDialetInvalidException, ORMLessDialetNotImplementedException } from './explorer.exceptions';
import { ExplorerConfig, ExplorerInterface } from './explorer.interface';
import { PostgresExplorer } from './explorer.postgres';

export class Explorer {
  #instance: ExplorerInterface;

  constructor(config: ExplorerConfig) {
    if (config.dialect === 'postgres') {
      this.#instance = new PostgresExplorer(config);
    } else if (typeof config.dialect === 'string') {
      throw new ORMLessDialetNotImplementedException(config.dialect);
    } else {
      throw new ORMLessDialetInvalidException();
    }
  }

  async getDefinitions() {
    const [columns, enums, tables, constraints] = await Promise.all([
      this.#instance.getColumnDefinitions(),
      this.#instance.getEnumDefinitions(),
      this.#instance.getTableDefinitions(),
      this.#instance.getConstraintDefinitions(),
    ]);
    return { columns, enums, tables, constraints };
  }
}
