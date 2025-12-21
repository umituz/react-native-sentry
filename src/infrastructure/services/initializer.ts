/**
 * Sentry Initializer
 * Single Responsibility: Initialize Sentry with validated configuration
 */

import { SentryClient } from '../config/SentryClient';
import { SentryConfigValidator } from '../config/validators/SentryConfigValidator';
import type { SentryConfig } from '../../domain/entities/SentryConfig';

export async function initializeSentry(config: SentryConfig): Promise<void> {
  SentryConfigValidator.validate(config);
  await SentryClient.initialize(config);
}

export function isSentryInitialized(): boolean {
  return SentryClient.isInitialized();
}
