import { api } from '@/lib/api';

import type { Column, ColumnListResponse } from '@/types/columns';

export const getColumns = async (dashboardId: number) => {
  const response = await api.get<ColumnListResponse>('/columns', {
    params: { dashboardId },
  });
  return response.data;
};

export interface CreateColumnRequest {
  title: string;
  dashboardId: number;
}

export const createColumn = async (data: CreateColumnRequest) => {
  const response = await api.post<Column>('/columns', data);
  return response.data;
};
