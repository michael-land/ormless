import { ORMLessAssertNonNullableException } from '../ormless.exceptions';

export function assertNonNullable<T>(value: T): asserts value is NonNullable<T> {
  if (value === null || value === undefined) {
    throw new ORMLessAssertNonNullableException();
  }
}
