/**
 * Sentry Config Validator
 * Single Responsibility: Validate Sentry configuration
 */

import type { SentryConfig } from '../../../domain/entities/SentryConfig';
import { SentryConfigError } from '../../../domain/errors/SentryError';

export class SentryConfigValidator {
  static validate(config: SentryConfig): void {
    if (!config.dsn) {
      throw new SentryConfigError('DSN is required');
    }

    if (!config.dsn.startsWith('https://')) {
      throw new SentryConfigError('DSN must start with https://');
    }

    // Support regional Sentry domains: .ingest.sentry.io, .ingest.us.sentry.io, .ingest.de.sentry.io, etc.
    if (!config.dsn.includes('@') || !config.dsn.includes('.sentry.io/')) {
      throw new SentryConfigError('Invalid DSN format');
    }

    if (!config.environment) {
      throw new SentryConfigError('Environment is required');
    }

    if (config.tracesSampleRate !== undefined) {
      if (config.tracesSampleRate < 0 || config.tracesSampleRate > 1) {
        throw new SentryConfigError('tracesSampleRate must be between 0 and 1');
      }
    }

    if (config.maxBreadcrumbs !== undefined) {
      if (config.maxBreadcrumbs < 0 || config.maxBreadcrumbs > 200) {
        throw new SentryConfigError('maxBreadcrumbs must be between 0 and 200');
      }
    }

    if (config.replaysSessionSampleRate !== undefined) {
      if (config.replaysSessionSampleRate < 0 || config.replaysSessionSampleRate > 1) {
        throw new SentryConfigError('replaysSessionSampleRate must be between 0 and 1');
      }
    }

    if (config.replaysOnErrorSampleRate !== undefined) {
      if (config.replaysOnErrorSampleRate < 0 || config.replaysOnErrorSampleRate > 1) {
        throw new SentryConfigError('replaysOnErrorSampleRate must be between 0 and 1');
      }
    }
  }
}
