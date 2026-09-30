import { api } from '@/lib/api';
import type {
  ModifyUserRequest,
  PasswordEditRequest,
  UploadImageResponse,
  User,
} from '@/types/auth';
import {
  type LoginRequest,
  type LoginResponse,
  type SignUpRequest,
  type SignupResponse,
} from '@/types/auth';

const teamId = process.env.NEXT_PUBLIC_TEAM_ID;

export const signUp = async (data: SignUpRequest) => {
  const response = await api.post<SignupResponse>('/users', data);
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await api.post<LoginResponse>('/auth/login', data);
  return response.data;
};

export const modifyMyPage = async (data: ModifyUserRequest) => {
  const response = await api.put<User>(`/users/me`, data);
  return response.data;
};

export const uploadProfileImage = async (file: File) => {
  const formData = new FormData();

  formData.append('image', file);

  const response = await api.post<UploadImageResponse>('/users/me/image', formData, {
    headers: {
      'Content-Type': undefined,
    },
  });

  return response.data;
};

export const editPassword = async (data: PasswordEditRequest) => {
  await api.put('/auth/password', data);
};
