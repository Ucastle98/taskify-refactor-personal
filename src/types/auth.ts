export interface SignUpRequest {
  email: string;
  nickname: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type SignupResponse = User;

export interface LoginResponse {
  user: User;
  accessToken: string;
}

export interface ApiErrorResponse {
  message: string;
}

export interface ModifyUserRequest {
  nickname: string;
  profileImageUrl?: string;
}

export interface UploadImageResponse {
  profileImageUrl: string;
}

export interface PasswordEditRequest {
  password: string;
  newPassword: string;
}
