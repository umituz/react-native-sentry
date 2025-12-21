/**
 * Sentry Configuration Entity
 * Single Responsibility: Define Sentry initialization configuration
 */

export interface SentryConfig {
  /**
   * Sentry DSN (Data Source Name)
   * Format: https://<key>@<organization>.ingest.sentry.io/<project>
   */
  dsn: string;

  /**
   * Environment identifier
   * Examples: 'development', 'staging', 'production'
   */
  environment: string;

  /**
   * Release version
   * Format: app-name@version (e.g., 'my-app@1.0.0')
   */
  release?: string;

  /**
   * Sample rate for performance tracing (0.0 to 1.0)
   * 1.0 = 100% of transactions
   * 0.1 = 10% of transactions
   */
  tracesSampleRate?: number;

  /**
   * Enable native crash handling
   * Default: true
   */
  enableNative?: boolean;

  /**
   * Enable automatic session tracking
   * Default: true
   */
  enableAutoSessionTracking?: boolean;

  /**
   * Attach screenshot on errors (production only)
   * Default: false
   */
  attachScreenshot?: boolean;

  /**
   * Maximum breadcrumbs to store
   * Default: 100
   */
  maxBreadcrumbs?: number;

  /**
   * Debug mode (enables console logging)
   * Should be false in production
   */
  debug?: boolean;

  /**
   * Enable Sentry Logs
   * Default: false
   */
  enableLogs?: boolean;

  /**
   * Session Replay sample rate (0.0 to 1.0)
   * Percentage of sessions to record for replay
   * Default: 0.1 (10%)
   */
  replaysSessionSampleRate?: number;

  /**
   * Session Replay on error sample rate (0.0 to 1.0)
   * Percentage of error sessions to record for replay
   * Default: 1.0 (100%)
   */
  replaysOnErrorSampleRate?: number;

  /**
   * Send default PII (Personally Identifiable Information)
   * Adds more context data to events (IP address, cookies, user, etc.)
   * Default: false
   */
  sendDefaultPii?: boolean;
}
