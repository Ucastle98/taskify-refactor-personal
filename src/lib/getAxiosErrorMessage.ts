import axios from 'axios';

import type { ApiErrorResponse } from '@/types/auth';

export function getAxiosErrorMessage(error: unknown, fallbackMessage: string): string {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) {
    return fallbackMessage;
  }

  const message = error.response?.data?.message;

  if (typeof message !== 'string') {
    return fallbackMessage;
  }

  return message.trim() || fallbackMessage;
}
