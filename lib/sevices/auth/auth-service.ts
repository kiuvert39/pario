import type {
  AuthUser,
  ForgotPasswordInput,
  LoginInput,
  OtpInput,
  SignupInput,
} from "@/lib/sevices/auth/types";

const fakeRequestDelay = 700;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function login(input: LoginInput): Promise<AuthUser> {
  await wait(fakeRequestDelay);

  return {
    email: input.email.trim().toLowerCase(),
  };
}

export async function signup(input: SignupInput): Promise<AuthUser> {
  await wait(fakeRequestDelay);

  return {
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
  };
}

export async function requestPasswordReset(
  input: ForgotPasswordInput,
): Promise<void> {
  void input;
  await wait(fakeRequestDelay);
}

export async function verifyOtp(input: OtpInput): Promise<void> {
  void input;
  await wait(fakeRequestDelay);
}
