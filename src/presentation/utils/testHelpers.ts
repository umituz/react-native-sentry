/**
 * Sentry Test Helpers
 * Utilities for testing Sentry integration in production/TestFlight
 */

import { SentryClient } from '../../infrastructure/config/SentryClient';

/**
 * Send test error to Sentry
 * Use this to verify Sentry is working in production builds
 *
 * @example
 * import { sendTestError } from '@umituz/react-native-sentry';
 * sendTestError(); // In a debug button
 */
export function sendTestError(): void {
    if (!SentryClient.isInitialized()) {
        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.warn('[Sentry Test] Not initialized, cannot send test error');
        }
        return;
    }

    try {
        SentryClient.addBreadcrumb({
            category: 'test',
            message: 'Test breadcrumb added',
            level: 'info',
            data: { timestamp: new Date().toISOString() },
        });

        const error = new Error(
            `[TEST] Sentry verification - ${new Date().toISOString()}`
        );
        SentryClient.captureException(error, {
            tags: { test: 'true', type: 'verification' },
            extra: { purpose: 'Testing Sentry integration', timestamp: Date.now() },
        });

        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.log('✅ Test error sent to Sentry');
        }
    } catch (error) {
        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.error('[Sentry Test] Failed to send test error:', error);
        }
    }
}

/**
 * Send test message to Sentry
 * Lighter alternative to sendTestError for verification
 *
 * @example
 * import { sendTestMessage } from '@umituz/react-native-sentry';
 * sendTestMessage();
 */
export function sendTestMessage(): void {
    if (!SentryClient.isInitialized()) {
        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.warn('[Sentry Test] Not initialized, cannot send test message');
        }
        return;
    }

    try {
        const message = `[TEST] Sentry message verification - ${new Date().toISOString()}`;
        SentryClient.captureMessage(message, 'info', {
            tags: { test: 'true', type: 'message' },
            extra: { timestamp: Date.now() },
        });

        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.log('✅ Test message sent to Sentry');
        }
    } catch (error) {
        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.error('[Sentry Test] Failed to send test message:', error);
        }
    }
}

/**
 * Set test user context
 * Verify user tracking is working
 *
 * @param userId - User ID to test with
 *
 * @example
 * import { setTestUser } from '@umituz/react-native-sentry';
 * setTestUser('test-user-123');
 */
export function setTestUser(userId: string): void {
    if (!SentryClient.isInitialized()) {
        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.warn('[Sentry Test] Not initialized, cannot set test user');
        }
        return;
    }

    try {
        SentryClient.setUser({
            id: userId,
            extras: {
                testMode: true,
                testTimestamp: new Date().toISOString(),
            },
        });

        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.log('✅ Test user set in Sentry:', userId);
        }
    } catch (error) {
        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.error('[Sentry Test] Failed to set test user:', error);
        }
    }
}

/**
 * Send comprehensive test suite
 * Tests breadcrumbs, user context, message and error tracking
 *
 * @param userId - Optional user ID for testing user context
 *
 * @example
 * import { runTestSuite } from '@umituz/react-native-sentry';
 * runTestSuite('user-123');
 */
export function runTestSuite(userId?: string): void {
    if (!SentryClient.isInitialized()) {
        /* eslint-disable-next-line no-console */
        if (__DEV__) {
            console.warn('[Sentry Test] Not initialized, cannot run test suite');
        }
        return;
    }

    /* eslint-disable-next-line no-console */
    if (__DEV__) {
        console.log('🧪 Running Sentry test suite...');
    }

    if (userId) {
        setTestUser(userId);
    }

    sendTestMessage();
    sendTestError();

    /* eslint-disable-next-line no-console */
    if (__DEV__) {
        console.log('✅ Sentry test suite completed. Check Sentry dashboard.');
    }
}
