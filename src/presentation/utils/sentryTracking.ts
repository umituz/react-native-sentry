/**
 * Sentry Tracking Utilities
 * Reusable error tracking for ANY package that needs Sentry integration
 *
 * Usage in packages:
 * import { trackPackageError, addPackageBreadcrumb } from '@umituz/react-native-sentry';
 */

import { SentryClient } from '../../infrastructure/config/SentryClient';

export interface PackageErrorContext {
  packageName: string;
  operation: string;
  userId?: string;
  [key: string]: any;
}

/**
 * Track error from any package
 *
 * @example
 * trackPackageError(error, {
 *   packageName: 'subscription',
 *   operation: 'purchase',
 *   userId: 'user123',
 *   productId: 'premium_monthly'
 * });
 */
export function trackPackageError(
  error: Error,
  context: PackageErrorContext
): void {
  if (!SentryClient.isInitialized()) return;

  try {
    SentryClient.captureException(error, {
      tags: {
        package: context.packageName,
        operation: context.operation,
      },
      extra: context,
    });
  } catch {
    // Silent fallback - don't break app if Sentry fails
  }
}

/**
 * Add breadcrumb from any package
 *
 * @example
 * addPackageBreadcrumb('subscription', 'User started purchase flow', {
 *   productId: 'premium_monthly'
 * });
 */
export function addPackageBreadcrumb(
  packageName: string,
  message: string,
  data?: Record<string, any>
): void {
  if (!SentryClient.isInitialized()) return;

  try {
    SentryClient.addBreadcrumb({
      category: packageName,
      message,
      level: 'info',
      data,
    });
  } catch {
    // Silent fallback
  }
}

/**
 * Track warning from any package
 *
 * @example
 * trackPackageWarning('subscription', 'RevenueCat not initialized', {
 *   userId: 'user123'
 * });
 */
export function trackPackageWarning(
  packageName: string,
  message: string,
  context?: Record<string, any>
): void {
  if (!SentryClient.isInitialized()) return;

  try {
    SentryClient.captureMessage(message, 'warning', {
      tags: {
        package: packageName,
      },
      extra: context,
    });
  } catch {
    // Silent fallback
  }
}
