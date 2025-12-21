/**
 * Sentry Client
 * Single Responsibility: Main Sentry client implementation
 */

import type { ISentryClient, CaptureMetadata, MessageLevel } from '../../application/ports/ISentryClient';
import type { SentryConfig } from '../../domain/entities/SentryConfig';
import type { UserData, Breadcrumb } from '../../domain/value-objects/ErrorMetadata';
import { SentryInitializationError } from '../../domain/errors/SentryError';
import { nativeSentryAdapter } from '../adapters/native-sentry.adapter';

class SentryClientImpl implements ISentryClient {
  private initialized = false;

  async initialize(config: SentryConfig): Promise<void> {
    try {
      if (this.initialized) {
        /* eslint-disable-next-line no-console */
        if (__DEV__) {
          console.warn('[Sentry] Already initialized');
        }
        return;
      }

      nativeSentryAdapter.init(config);
      this.initialized = true;

      /* eslint-disable-next-line no-console */
      if (__DEV__) {
        console.log('[Sentry] Initialized successfully');
      }
    } catch (error) {
      throw new SentryInitializationError(
        'Failed to initialize Sentry',
        error as Error,
      );
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  async captureException(error: Error, metadata?: CaptureMetadata): Promise<string | undefined> {
    if (!this.initialized) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) {
        console.warn('[Sentry] Not initialized, skipping captureException');
      }
      return undefined;
    }

    return nativeSentryAdapter.captureException(error, metadata);
  }

  async captureMessage(message: string, level?: MessageLevel, metadata?: CaptureMetadata): Promise<string | undefined> {
    if (!this.initialized) {
      /* eslint-disable-next-line no-console */
      if (__DEV__) {
        console.warn('[Sentry] Not initialized, skipping captureMessage');
      }
      return undefined;
    }

    return nativeSentryAdapter.captureMessage(message, level, metadata);
  }

  addBreadcrumb(breadcrumb: Breadcrumb): void {
    if (!this.initialized) {
      return;
    }

    nativeSentryAdapter.addBreadcrumb(breadcrumb);
  }

  setUser(user: UserData | null): void {
    if (!this.initialized) {
      return;
    }

    nativeSentryAdapter.setUser(user);
  }

  setTag(key: string, value: string | number | boolean): void {
    if (!this.initialized) {
      return;
    }

    nativeSentryAdapter.setTag(key, value);
  }

  setExtra(key: string, value: any): void {
    if (!this.initialized) {
      return;
    }

    nativeSentryAdapter.setExtra(key, value);
  }

  clearUser(): void {
    this.setUser(null);
  }
}

export const SentryClient = new SentryClientImpl();
