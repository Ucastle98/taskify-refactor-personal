import { api } from '@/lib/api';
import type {
  Dashboard,
  DashboardInvite,
  DashboardInviteListResponse,
  DashboardListResponse,
} from '@/types/dashboard';

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

export interface InviteDashboardRequest {
  email: string;
}

export const createDashboard = async (data: CreateDashboardRequest) => {
  const response = await api.post<Dashboard>(`/dashboards`, data);
  return response.data;
};

export const getDashboard = async (dashboardId: number) => {
  const response = await api.get<Dashboard>(`/dashboards/${dashboardId}`);
  return response.data;
};

export const modifyDashboard = async (dashboardId: number, data: CreateDashboardRequest) => {
  const response = await api.put<Dashboard>(`/dashboards/${dashboardId}`, data);
  return response.data;
};

export const deleteDashboard = async (dashboardId: number) => {
  await api.delete(`/dashboards/${dashboardId}`);
};

export const inviteDashboard = async (dashboardId: number, data: InviteDashboardRequest) => {
  const response = await api.post<DashboardInvite>(`/dashboards/${dashboardId}/invitations`, data);
  return response.data;
};

export const getInviteDashboards = async (dashboardId: number) => {
  const response = await api.get<DashboardInviteListResponse>(
    `/dashboards/${dashboardId}/invitations`,
  );
  return response.data;
};

export const cancelInvite = async (dashboardId: number, invitationId: number) => {
  await api.delete(`/dashboards/${dashboardId}/invitations/${invitationId}`);
};
