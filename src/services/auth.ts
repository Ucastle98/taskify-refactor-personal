import { api } from '@/lib/api';
import {
  type SignupResponse,
  type LoginRequest,
  type LoginResponse,
  type SignUpRequest,
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
