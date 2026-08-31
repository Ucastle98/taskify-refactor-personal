export interface Column {
  id: number;
  title: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnListResponse {
  result: string;
  data: Column[];
}
