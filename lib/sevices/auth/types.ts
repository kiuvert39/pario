export type AuthUser = {
  email: string;
  name?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SignupInput = LoginInput & {
  name: string;
};

export type ForgotPasswordInput = {
  email: string;
};

export type OtpInput = {
  code: string;
};
