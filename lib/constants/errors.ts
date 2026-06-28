export const ERRORS = {
  auth:{ unauthorized:'You must be signed in.', forbidden:'Access denied.' },
  workflow:{ notFound:'Workflow not found.', limitReached:'Workflow limit reached.' },
  execution:{ notFound:'Execution not found.', timeout:'Execution timed out.' },
  generic:{ serverError:'An unexpected error occurred.', networkError:'Network error.' }
} as const
