import { api } from '@/lib/api';

import type { Dashboard, DashboardListResponse } from '@/types/dashboard';

const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

export const getDashboards = async () => {
  const response = await api.get<DashboardListResponse>(`/dashboards`, {
    params: {
      navigationMethod: 'infiniteScroll',
    },
  });
  return response.data;
};

export interface CreateDashboardRequest {
  title: string;
  color: string;
}

export const createDashboard = async (data: CreateDashboardRequest) => {
  const response = await api.post<Dashboard>(`/dashboards`, data);
  return response.data;
};
