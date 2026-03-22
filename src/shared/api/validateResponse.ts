import { z } from 'zod'

export class ResponseValidationError extends Error {
  readonly issues: z.ZodIssue[]

  constructor(issues: z.ZodIssue[]) {
    super('Response validation failed')
    this.name = 'ResponseValidationError'
    this.issues = issues
  }
}

export const validateResponse =
  <TSchema extends z.ZodTypeAny>(schema: TSchema) =>
  (response: unknown): z.infer<TSchema> => {
    const result = schema.safeParse(response)

    if (!result.success) {
      throw new ResponseValidationError(result.error.issues)
    }

    return result.data
  }
