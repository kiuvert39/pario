import { Link, router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import { AuthCard } from "@/components/ui/auth-card";
import { Button } from "@/components/ui/button";
import { AppText } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { AppView } from "@/components/ui/view";
import { AUTH_COPY, AUTH_FIELDS, AUTH_ROUTES } from "@/constants/auth";
import { useAuth } from "@/lib/sevices/auth/auth-context";
import type { ForgotPasswordInput } from "@/lib/sevices/auth/types";
import {
    hasErrors,
    validateForgotPassword,
    type AuthErrors,
} from "@/lib/sevices/auth/validation";

const initialForm: ForgotPasswordInput = {
  email: "",
};

export default function ForgotPasswordScreen() {
  const { requestPasswordReset } = useAuth();
  const [form, setForm] = useState<ForgotPasswordInput>(initialForm);
  const [errors, setErrors] = useState<AuthErrors<ForgotPasswordInput>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const nextErrors = validateForgotPassword(form);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    await requestPasswordReset(form);
    setIsSubmitting(false);
    router.push({
      pathname: AUTH_ROUTES.otp,
      params: { flow: "forgot-password" },
    });
  }

  return (
    <AppView className="flex-1 justify-center bg-pario-ink px-2">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <AuthCard className="gap-7 border-0 bg-transparent p-0 dark:bg-transparent">
          <View className="items-center gap-3 px-3">
            <AppText
              className="text-center text-[28px] text-foreground-dark"
              variant="title"
            >
              {AUTH_COPY.forgotPassword.title}
            </AppText>
            <AppText
              className="text-center text-sm text-muted-foreground-dark"
              variant="muted"
            >
              {AUTH_COPY.forgotPassword.description}
            </AppText>
          </View>

          <TextField
            autoCapitalize="none"
            autoComplete="email"
            className="rounded-full border-0 bg-pario-ink-raised text-foreground-dark"
            error={errors.email}
            keyboardType="email-address"
            label={AUTH_FIELDS.email.label}
            labelClassName="text-foreground-dark"
            onChangeText={(email) => setForm({ email })}
            placeholder={AUTH_FIELDS.email.placeholder}
            textContentType="emailAddress"
            value={form.email}
          />

          <Button
            className="h-14 rounded-full bg-accent active:bg-accent-hover"
            isLoading={isSubmitting}
            onPress={handleSubmit}
            textClassName="text-accent-foreground"
            title={AUTH_COPY.forgotPassword.submit}
          />

          <Link className="self-center" href={AUTH_ROUTES.login}>
            <AppText className="text-accent" variant="link">
              {AUTH_COPY.forgotPassword.backAction}
            </AppText>
          </Link>
        </AuthCard>
      </KeyboardAvoidingView>
    </AppView>
  );
}
