# @umituz/react-native-sentry

Production-ready error tracking and performance monitoring for React Native apps.

## Features

- ✅ Error tracking (captureException, captureMessage)
- ✅ Breadcrumb logging
- ✅ User identification
- ✅ Custom tags and extra data
- ✅ Performance monitoring
- ✅ Privacy-compliant (email masking)
- ✅ TypeScript support
- ✅ Clean Architecture (DDD)

## Installation

```bash
npm install @umituz/react-native-sentry @sentry/react-native
```

## Usage

### Initialize

```typescript
import { initializeSentry } from '@umituz/react-native-sentry';

await initializeSentry({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN!,
  environment: __DEV__ ? 'development' : 'production',
  release: '1.0.0',
  tracesSampleRate: __DEV__ ? 1.0 : 0.1,
});
```

### Capture Errors

```typescript
import { useSentry } from '@umituz/react-native-sentry';

function MyScreen() {
  const { captureException } = useSentry();

  const handleAction = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      captureException(error as Error, {
        tags: { screen: 'MyScreen' },
        extra: { userId: user.id }
      });
    }
  };
}
```

### Add Breadcrumbs

```typescript
import { useBreadcrumb } from '@umituz/react-native-sentry';

function MyComponent() {
  const { addBreadcrumb } = useBreadcrumb();

  useEffect(() => {
    addBreadcrumb({
      category: 'navigation',
      message: 'User navigated to MyScreen',
      level: 'info'
    });
  }, []);
}
```

### Test Helpers (Production/TestFlight)

Verify Sentry is working in production builds:

```typescript
import { sendTestError, sendTestMessage, runTestSuite } from '@umituz/react-native-sentry';

// Send a single test error
sendTestError();

// Send a test message
sendTestMessage();

// Run complete test suite
runTestSuite('user-123');
```

Add a debug button in your app (e.g., Settings screen) to trigger these tests in TestFlight builds.

## License

MIT
