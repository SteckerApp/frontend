

import { ApiEnvelope } from "@/types/shared.types";

// Tolerates both enveloped and bare responses, like the original.
export const unwrap = <T>(res: ApiEnvelope<T> | T): T =>
  (res as ApiEnvelope<T> | undefined)?.data ?? (res as T)



export const ALLOWED_TYPES = ['client', 'affiliate']