export type ToastEventType = 'success' | 'error' | 'info';

export interface ToastType {
  message: string;
  eventType: ToastEventType;
}
