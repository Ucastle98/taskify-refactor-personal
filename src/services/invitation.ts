import { api } from '@/lib/api';

import type { InvitationsListResponse } from '@/types/invitation';

const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

export const getInvitations = async () => {
  const response = await api.get<InvitationsListResponse>(`/invitations`);
  return response.data;
};
