/**
 * Native Sentry Adapter
 * Single Responsibility: Handle Sentry React Native SDK integration
 */

import * as Sentry from '@sentry/react-native';
import type { SentryConfig } from '../../domain/entities/SentryConfig';
import type { UserData, Breadcrumb } from '../../domain/value-objects/ErrorMetadata';
import type { CaptureMetadata, MessageLevel } from '../../application/ports/ISentryClient';

export interface NativeSentryAdapter {
  init(config: SentryConfig): void;
  captureException(error: Error, metadata?: CaptureMetadata): string | undefined;
  captureMessage(message: string, level?: MessageLevel, metadata?: CaptureMetadata): string | undefined;
  addBreadcrumb(breadcrumb: Breadcrumb): void;
  setUser(user: UserData | null): void;
  setTag(key: string, value: string | number | boolean): void;
  setExtra(key: string, value: any): void;
}

export const nativeSentryAdapter: NativeSentryAdapter = {
  init(config: SentryConfig): void {
    Sentry.init({
      dsn: config.dsn,
      environment: config.environment,
      release: config.release,
      tracesSampleRate: config.tracesSampleRate ?? 0.1,
      enableNative: config.enableNative ?? true,
      autoSessionTracking: config.autoSessionTracking ?? true,
      attachScreenshot: config.attachScreenshot ?? false,
      maxBreadcrumbs: config.maxBreadcrumbs ?? 100,
      debug: config.debug ?? false,
      enableAutoPerformanceTracing: true,
      enableNativeCrashHandling: true,
      beforeSend: (event) => {
        // Privacy: Mask email in production
        if (!__DEV__ && event.user?.email) {
          event.user.email = '***@***.***';
        }
        return event;
      },
    });
  },

  captureException(error: Error, metadata?: CaptureMetadata): string | undefined {
    return Sentry.captureException(error, {
      tags: metadata?.tags,
      extra: metadata?.extra,
      user: metadata?.user,
    });
  },

  captureMessage(message: string, level?: MessageLevel, metadata?: CaptureMetadata): string | undefined {
    return Sentry.captureMessage(message, {
      level: level as Sentry.SeverityLevel,
      tags: metadata?.tags,
      extra: metadata?.extra,
      user: metadata?.user,
    });
  },

  addBreadcrumb(breadcrumb: Breadcrumb): void {
    Sentry.addBreadcrumb({
      message: breadcrumb.message,
      category: breadcrumb.category,
      level: breadcrumb.level as Sentry.SeverityLevel,
      data: breadcrumb.data,
      timestamp: breadcrumb.timestamp,
    });
  },

  setUser(user: UserData | null): void {
    Sentry.setUser(user);
  },

  setTag(key: string, value: string | number | boolean): void {
    Sentry.setTag(key, value);
  },

  setExtra(key: string, value: any): void {
    Sentry.setExtra(key, value);
  },
};
