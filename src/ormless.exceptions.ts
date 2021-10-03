export class ORMLessMissingWhereClasueException extends Error {
  constructor() {
    super('where clasue must have exact 1 key');
  }
}

export class ORMLessAssertNonNullableException extends Error {
  constructor() {
    super('value should be non-nullable');
  }
}
