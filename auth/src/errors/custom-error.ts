export abstract class CustomError extends Error {
  // Abstract properties must be implemented in classes that extend CustomError, providing a specific value for statusCode.
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
