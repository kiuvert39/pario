import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

import * as authService from '@/lib/auth/auth-service';
import type {
  AuthUser,
  ForgotPasswordInput,
  LoginInput,
  OtpInput,
  SignupInput,
} from '@/lib/auth/types';

type AuthContextValue = {
  login: (input: LoginInput) => Promise<void>;
  logout: () => void;
  requestPasswordReset: (input: ForgotPasswordInput) => Promise<void>;
  signup: (input: SignupInput) => Promise<void>;
  user: AuthUser | null;
  verifyOtp: (input: OtpInput) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      async login(input) {
        setUser(await authService.login(input));
      },
      logout() {
        setUser(null);
      },
      async requestPasswordReset(input) {
        await authService.requestPasswordReset(input);
      },
      async signup(input) {
        setUser(await authService.signup(input));
      },
      user,
      async verifyOtp(input) {
        await authService.verifyOtp(input);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return auth;
}
