import authContent from './auth-content.json';

export const AUTH_ROUTES = {
  forgotPassword: '/forgot-password',
  login: '/login',
  otp: '/verify-otp',
  signup: '/signup',
  onboarding: '/',
  home: '/',
} as const;

export const AUTH_FIELDS = {
  name: {
    label: 'Name',
    placeholder: 'Enter your Name',
    minLength: 2,
  },
  email: {
    label: 'Email',
    placeholder: 'Enter your Email',
  },
  password: {
    label: 'Password',
    placeholder: 'Enter your Password',
    minLength: 8,
  },
  otp: {
    label: 'Verification code',
    placeholder: 'Enter 6-digit code',
    length: 6,
  },
} as const;

export const AUTH_COPY = authContent;
