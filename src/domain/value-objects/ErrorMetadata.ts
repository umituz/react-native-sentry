/**
 * Error Metadata Value Object
 * Single Responsibility: Define additional metadata for errors
 */

export interface UserData {
  id?: string;
  email?: string;
  username?: string;
  ipAddress?: string;
}

export interface ErrorTags {
  [key: string]: string | number | boolean;
}

export interface ErrorExtra {
  [key: string]: any;
}

export interface BreadcrumbData {
  [key: string]: any;
}

export type BreadcrumbLevel = 'fatal' | 'error' | 'warning' | 'info' | 'debug';

export interface Breadcrumb {
  message: string;
  category?: string;
  level?: BreadcrumbLevel;
  data?: BreadcrumbData;
  timestamp?: number;
}

export interface ErrorMetadata {
  user?: UserData;
  tags?: ErrorTags;
  extra?: ErrorExtra;
  breadcrumbs?: Breadcrumb[];
}
