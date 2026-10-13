

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED TYPES 
// ═══════════════════════════════════════════════════════════════════════════════
export type Id = string | number

export interface ApiEnvelope<T> {
  message?: string
  data: T
}

/** Response for mutations we don't unwrap */
export interface ApiMessage {
  message?: string
  data?: unknown
  status?: string | number
  response?: {
      message: string
  }
}

/** Query-string params for list endpoints */
export type ListParams = Record<string, string | number | boolean | undefined>