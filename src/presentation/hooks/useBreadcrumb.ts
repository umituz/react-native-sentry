/**
 * useBreadcrumb Hook
 * Single Responsibility: Provide breadcrumb logging functionality
 */

import { useCallback } from 'react';
import { SentryClient } from '../../infrastructure/config/SentryClient';
import type { Breadcrumb } from '../../domain/value-objects/ErrorMetadata';

export interface UseBreadcrumbReturn {
  addBreadcrumb: (breadcrumb: Breadcrumb) => void;
}

export function useBreadcrumb(): UseBreadcrumbReturn {
  const addBreadcrumb = useCallback((breadcrumb: Breadcrumb): void => {
    SentryClient.addBreadcrumb(breadcrumb);
  }, []);

  return {
    addBreadcrumb,
  };
}
