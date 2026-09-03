export interface Dashboard {
  id: number;
  title: string;
  color: string;
  createdAt: string;
  updatedAt: string;
  createdByMe: boolean;
  userId: number;
}

export interface DashboardListResponse {
  cursorId: number;
  totalCount: number;
  dashboards: Dashboard[];
}

// export type DashboardsListDetail = Dashboard;
// 대시보드 상세 조회는 Dashboard 이용

// export type DashboardModify = Dashboard;
// 대시보드 수정 또한 Dashboard 이용

export interface DashboardInvite {
  id: number;
  inviter: {
    nickname: string;
    email: string;
    id: number;
  };
  teamId: string;
  dashboard: {
    title: string;
    id: number;
  };
  invitee: {
    nickname: string;
    email: string;
    id: number;
  };
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardInviteListResponse {
  totalCount: number;
  invitations: DashboardInvite[];
}
