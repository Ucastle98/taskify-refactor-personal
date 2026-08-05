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
