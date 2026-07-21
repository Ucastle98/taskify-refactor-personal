export interface InvitationUser {
  nickname: string;
  email: string;
  id: number;
}

export interface Invitation {
  id: number;
  inviter: InvitationUser;
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: InvitationUser;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface InvitationsListResponse {
  cursorId: number;
  invitations: Invitation[];
}
