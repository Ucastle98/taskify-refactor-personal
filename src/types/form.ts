export interface LoginFormValues {
  email: string;
  password: string;
}

export interface SignUpFormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

export type LoginFormErrors = LoginFormValues;

export type SignUpFormErrors = SignUpFormValues;
