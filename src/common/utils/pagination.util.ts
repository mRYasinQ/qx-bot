import type { FilterQuery, FindOptions } from '@mikro-orm/core';

import type { FindAllOptions, PaginatedResult } from '../interfaces/pagination.interface';

interface PrepareFindAllOptionsResult<T> {
  where: FilterQuery<T>;
  findOptions: FindOptions<T>;
}

const prepareFindAllOptions = <T>(options: FindAllOptions<T>): PrepareFindAllOptionsResult<T> => {
  const { where = {}, page = 1, limit = 5, disablePagination = false } = options;

  const safeLimit = Math.min(limit, 10);

  const findOptions: FindOptions<T> = {};

  if (!disablePagination) {
    findOptions.limit = safeLimit;
    findOptions.offset = (page - 1) * safeLimit;
  }

  return { where, findOptions };
};

const formatPaginatedResult = <T>(
  items: T[],
  total: number,
  options: FindAllOptions<T>,
  findOptions: FindOptions<T>,
): PaginatedResult<T> => {
  const page = options.page ?? 1;
  const limit = findOptions.limit ?? total;
  const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;

  return {
    items,
    total,
    page: options.disablePagination ? 1 : page,
    totalPages,
  };
};

export { prepareFindAllOptions, formatPaginatedResult };
