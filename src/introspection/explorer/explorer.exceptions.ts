export class ORMLessDialetNotImplementedException extends Error {
  constructor(dialet: string) {
    super(`dialect ${dialet} not implemented.`);
  }
}

export class ORMLessDialetInvalidException extends Error {
  constructor() {
    super(`dialect must be string.`);
  }
}
