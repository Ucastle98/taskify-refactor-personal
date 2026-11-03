import { api } from '@/lib/api';
import type { MemberListResponse } from '@/types/member';

export const getMembers = async (dashboardId: number) => {
  const response = await api.get<MemberListResponse>(`/members`, { params: { dashboardId } });
  return response.data;
};
