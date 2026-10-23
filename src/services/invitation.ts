import { api } from '@/lib/api';
import type { Invitation, InvitationsListResponse } from '@/types/invitation';

const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

export const getInvitations = async () => {
  const response = await api.get<InvitationsListResponse>(`/invitations`);
  return response.data;
};

export interface InvitationsAnswerRequest {
  inviteAccepted: boolean;
}

export const answerInvite = async (invitationId: number, data: InvitationsAnswerRequest) => {
  const response = await api.put<Invitation>(`/invitations/${invitationId}`, data);
  return response.data;
};
