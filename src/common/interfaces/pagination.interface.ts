import type { FilterQuery } from '@mikro-orm/core';

interface FindAllOptions<T> {
  where?: FilterQuery<T>;
  page?: number;
  limit?: number;
  disablePagination?: boolean;
}

interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}

export type { FindAllOptions, PaginatedResult };
