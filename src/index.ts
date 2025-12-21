/**
 * @umituz/react-native-sentry
 * Production-ready error tracking and performance monitoring
 */

// Domain
export type { SentryConfig } from './domain/entities/SentryConfig';
export type {
  UserData,
  ErrorTags,
  ErrorExtra,
  Breadcrumb,
  BreadcrumbLevel,
  BreadcrumbData,
  ErrorMetadata,
} from './domain/value-objects/ErrorMetadata';
export {
  SentryError,
  SentryConfigError,
  SentryInitializationError,
} from './domain/errors/SentryError';

// Application
export type {
  ISentryClient,
  CaptureMetadata,
  MessageLevel,
} from './application/ports/ISentryClient';

// Infrastructure
export { SentryClient } from './infrastructure/config/SentryClient';
export { initializeSentry, isSentryInitialized } from './infrastructure/services/initializer';

// Presentation
export { useSentry } from './presentation/hooks/useSentry';
export type { UseSentryReturn } from './presentation/hooks/useSentry';
export { useBreadcrumb } from './presentation/hooks/useBreadcrumb';
export type { UseBreadcrumbReturn } from './presentation/hooks/useBreadcrumb';
