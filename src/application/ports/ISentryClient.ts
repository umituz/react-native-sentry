/**
 * Sentry Client Interface
 * Single Responsibility: Define contract for Sentry client operations
 */

import type { SentryConfig } from '../../domain/entities/SentryConfig';
import type { UserData, ErrorTags, ErrorExtra, Breadcrumb } from '../../domain/value-objects/ErrorMetadata';

export interface ISentryClient {
  /**
   * Initialize Sentry with configuration
   */
  initialize(config: SentryConfig): Promise<void>;

  /**
   * Check if Sentry is initialized
   */
  isInitialized(): boolean;

  /**
   * Capture an exception
   */
  captureException(error: Error, metadata?: CaptureMetadata): Promise<string | undefined>;

  /**
   * Capture a message
   */
  captureMessage(message: string, level?: MessageLevel, metadata?: CaptureMetadata): Promise<string | undefined>;

  /**
   * Add breadcrumb
   */
  addBreadcrumb(breadcrumb: Breadcrumb): void;

  /**
   * Set user data
   */
  setUser(user: UserData | null): void;

  /**
   * Set tag
   */
  setTag(key: string, value: string | number | boolean): void;

  /**
   * Set extra data
   */
  setExtra(key: string, value: any): void;

  /**
   * Clear all user data
   */
  clearUser(): void;
}

export interface CaptureMetadata {
  tags?: ErrorTags;
  extra?: ErrorExtra;
  user?: UserData;
}

export type MessageLevel = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';
