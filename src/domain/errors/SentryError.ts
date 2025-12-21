/**
 * Sentry Error
 * Single Responsibility: Custom error class for Sentry-related errors
 */

export class SentryError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly originalError?: Error,
  ) {
    super(message);
    this.name = 'SentryError';
    Object.setPrototypeOf(this, SentryError.prototype);
  }

  toString(): string {
    return `${this.name} [${this.code}]: ${this.message}`;
  }
}

export class SentryConfigError extends SentryError {
  constructor(message: string, originalError?: Error) {
    super(message, 'SENTRY_CONFIG_ERROR', originalError);
    this.name = 'SentryConfigError';
  }
}

export class SentryInitializationError extends SentryError {
  constructor(message: string, originalError?: Error) {
    super(message, 'SENTRY_INIT_ERROR', originalError);
    this.name = 'SentryInitializationError';
  }
}
