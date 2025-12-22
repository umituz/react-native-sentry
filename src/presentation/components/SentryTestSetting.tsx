/**
 * Sentry Test Setting Component
 * Single Responsibility: Provide Sentry test setting config (DEV only)
 * Framework-agnostic design - returns configuration object
 */

import { runTestSuite } from "../utils/testHelpers";

export interface SentryTestSettingProps {
    title?: string;
    description?: string;
    userId?: string;
    iconColor?: string;
    titleColor?: string;
    isLast?: boolean;
    onPress?: (userId?: string) => void;
}

/**
 * Creates Sentry test setting configuration
 * Returns setting item props for use with any UI framework
 *
 * @example
 * ```typescript
 * import { createSentryTestSetting } from '@umituz/react-native-sentry';
 *
 * const sentryTestConfig = createSentryTestSetting({ userId: 'user123' });
 * // Use with your UI framework's SettingItem component
 * ```
 */
export function createSentryTestSetting(props: SentryTestSettingProps = {}) {
    // Only return config in DEV mode
    if (!__DEV__) {
        return null;
    }

    return {
        type: "setting-item" as const,
        icon: "bug" as const,
        title: props.title || "Test Sentry",
        value: props.description || "Send test error to Sentry dashboard",
        onPress: () => {
            if (props.onPress) {
                props.onPress(props.userId);
            } else {
                runTestSuite(props.userId);
            }
        },
        iconColor: props.iconColor || "#EF4444",
        titleColor: props.titleColor || "#EF4444",
        isLast: props.isLast ?? false,
        devOnly: true,
    };
}

// Alias for backward compatibility
export const SentryTestSetting = createSentryTestSetting;
