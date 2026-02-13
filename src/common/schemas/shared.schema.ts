import z from 'zod';

const pageSchema = z.coerce.number().int().min(1).default(1);

const numericIdSchema = z.coerce.number().int().positive();

type Page = z.infer<typeof pageSchema>;
type NumericId = z.infer<typeof numericIdSchema>;

export type { Page, NumericId };
export { pageSchema, numericIdSchema };
