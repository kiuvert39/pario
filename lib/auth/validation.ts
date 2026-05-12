import { AUTH_FIELDS } from '@/constants/auth';
import type {
  ForgotPasswordInput,
  LoginInput,
  OtpInput,
  SignupInput,
} from '@/lib/auth/types';

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AuthErrors<TInput> = Partial<Record<keyof TInput, string>>;

export function validateLogin(input: LoginInput): AuthErrors<LoginInput> {
  const errors: AuthErrors<LoginInput> = {};

  if (!emailPattern.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (input.password.length < AUTH_FIELDS.password.minLength) {
    errors.password = `Use at least ${AUTH_FIELDS.password.minLength} characters.`;
  }

  return errors;
}

export function validateSignup(input: SignupInput): AuthErrors<SignupInput> {
  const errors: AuthErrors<SignupInput> = {
    ...validateLogin(input),
  };

  if (input.name.trim().length < AUTH_FIELDS.name.minLength) {
    errors.name = `Use at least ${AUTH_FIELDS.name.minLength} characters.`;
  }

  return errors;
}

export function validateForgotPassword(
  input: ForgotPasswordInput
): AuthErrors<ForgotPasswordInput> {
  const errors: AuthErrors<ForgotPasswordInput> = {};

  if (!emailPattern.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  return errors;
}

export function validateOtp(input: OtpInput): AuthErrors<OtpInput> {
  const errors: AuthErrors<OtpInput> = {};
  const code = input.code.trim();

  if (!new RegExp(`^\\d{${AUTH_FIELDS.otp.length}}$`).test(code)) {
    errors.code = `Enter the ${AUTH_FIELDS.otp.length}-digit code.`;
  }

  return errors;
}

export function hasErrors(errors: Record<string, string | undefined>) {
  return Object.values(errors).some(Boolean);
}
