/**
 * useSentry Hook
 * Single Responsibility: Provide error tracking functionality
 */

import { useCallback } from 'react';
import { SentryClient } from '../../infrastructure/config/SentryClient';
import type { CaptureMetadata, MessageLevel } from '../../application/ports/ISentryClient';
import type { UserData } from '../../domain/value-objects/ErrorMetadata';

export interface UseSentryReturn {
  captureException: (error: Error, metadata?: CaptureMetadata) => Promise<string | undefined>;
  captureMessage: (message: string, level?: MessageLevel, metadata?: CaptureMetadata) => Promise<string | undefined>;
  setUser: (user: UserData | null) => void;
  clearUser: () => void;
  setTag: (key: string, value: string | number | boolean) => void;
  setExtra: (key: string, value: any) => void;
  isInitialized: boolean;
}

export function useSentry(): UseSentryReturn {
  const captureException = useCallback(async (
    error: Error,
    metadata?: CaptureMetadata,
  ): Promise<string | undefined> => {
    return await SentryClient.captureException(error, metadata);
  }, []);

  const captureMessage = useCallback(async (
    message: string,
    level?: MessageLevel,
    metadata?: CaptureMetadata,
  ): Promise<string | undefined> => {
    return await SentryClient.captureMessage(message, level, metadata);
  }, []);

  const setUser = useCallback((user: UserData | null): void => {
    SentryClient.setUser(user);
  }, []);

  const clearUser = useCallback((): void => {
    SentryClient.clearUser();
  }, []);

  const setTag = useCallback((key: string, value: string | number | boolean): void => {
    SentryClient.setTag(key, value);
  }, []);

  const setExtra = useCallback((key: string, value: any): void => {
    SentryClient.setExtra(key, value);
  }, []);

  return {
    captureException,
    captureMessage,
    setUser,
    clearUser,
    setTag,
    setExtra,
    isInitialized: SentryClient.isInitialized(),
  };
}
