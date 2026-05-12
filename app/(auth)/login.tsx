import { Link, router } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { AuthCard } from '@/components/ui/auth-card';
import { Button } from '@/components/ui/button';
import { AppText } from '@/components/ui/text';
import { TextField } from '@/components/ui/text-field';
import { AppView } from '@/components/ui/view';
import { AUTH_ASSETS } from '@/constants/auth-assets';
import { AUTH_COPY, AUTH_FIELDS, AUTH_ROUTES } from '@/constants/auth';
import { useAuth } from '@/lib/auth/auth-context';
import { hasErrors, validateLogin, type AuthErrors } from '@/lib/auth/validation';
import type { LoginInput } from '@/lib/auth/types';

const initialForm: LoginInput = {
  email: '',
  password: '',
};

export default function LoginScreen() {
  const { login } = useAuth();
  const [form, setForm] = useState<LoginInput>(initialForm);
  const [errors, setErrors] = useState<AuthErrors<LoginInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const nextErrors = validateLogin(form);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    await login(form);
    setIsSubmitting(false);
    router.replace(AUTH_ROUTES.home);
  }

  return (
    <AppView className="flex-1 justify-center bg-pario-ink px-2">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <AuthCard className="gap-7 border-0 bg-transparent p-0 dark:bg-transparent">
          <View className="items-center gap-3 px-3">
            <AppText className="text-center text-[28px] text-foreground-dark" variant="title">
              {AUTH_COPY.login.title}
            </AppText>
            <AppText className="text-center text-sm text-muted-foreground-dark" variant="muted">
              {AUTH_COPY.login.description}
            </AppText>
          </View>

          <Button
            className="h-12 rounded-full border-0 bg-pario-ink-raised"
            leftAccessory={
              <SvgXml height={20} width={20} xml={AUTH_ASSETS.googleLogoSvg} />
            }
            textClassName="text-foreground-dark"
            title={AUTH_COPY.login.oauth}
            variant="secondary"
          />

          <View className="flex-row items-center gap-3">
            <View className="h-px flex-1 bg-border-dark" />
            <AppText className="text-xs text-muted-foreground-dark" variant="muted">
              {AUTH_COPY.login.divider}
            </AppText>
            <View className="h-px flex-1 bg-border-dark" />
          </View>

          <View className="gap-4">
            <TextField
              autoCapitalize="none"
              autoComplete="email"
              className="rounded-full border-0 bg-pario-ink-raised text-foreground-dark"
              error={errors.email}
              keyboardType="email-address"
              label={AUTH_FIELDS.email.label}
              labelClassName="text-foreground-dark"
              onChangeText={(email) => setForm((current) => ({ ...current, email }))}
              placeholder={AUTH_FIELDS.email.placeholder}
              textContentType="emailAddress"
              value={form.email}
            />
            <TextField
              autoCapitalize="none"
              className="rounded-full border-0 bg-pario-ink-raised text-foreground-dark"
              error={errors.password}
              label={AUTH_FIELDS.password.label}
              labelClassName="text-foreground-dark"
              onChangeText={(password) => setForm((current) => ({ ...current, password }))}
              placeholder={AUTH_FIELDS.password.placeholder}
              secureTextEntry
              textContentType="password"
              value={form.password}
            />
            <Link className="self-end" href={AUTH_ROUTES.forgotPassword}>
              <AppText className="text-sm text-accent" variant="link">
                {AUTH_COPY.login.forgotPassword}
              </AppText>
            </Link>
          </View>

          <Button
            className="h-14 rounded-full bg-accent active:bg-accent-hover"
            isLoading={isSubmitting}
            onPress={handleSubmit}
            textClassName="text-accent-foreground"
            title={AUTH_COPY.login.submit}
          />

          <View className="flex-row justify-center gap-1">
            <AppText className="text-foreground-dark" variant="muted">
              {AUTH_COPY.login.switchPrompt}
            </AppText>
            <Link href={AUTH_ROUTES.signup}>
              <AppText className="text-accent" variant="link">
                {AUTH_COPY.login.switchAction}
              </AppText>
            </Link>
          </View>
        </AuthCard>
      </KeyboardAvoidingView>
    </AppView>
  );
}
