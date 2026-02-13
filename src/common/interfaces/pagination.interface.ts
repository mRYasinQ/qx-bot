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
  pages: number;
  nextPage: number;
  prevPage: number;
}

export type { FindAllOptions, PaginatedResult };
