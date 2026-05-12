import { Link, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import { AuthCard } from "@/components/ui/auth-card";
import { Button } from "@/components/ui/button";
import { OtpInput } from "@/components/ui/otp-input";
import { AppText } from "@/components/ui/text";
import { AppView } from "@/components/ui/view";
import { AUTH_COPY, AUTH_FIELDS, AUTH_ROUTES } from "@/constants/auth";
import { useAuth } from "@/lib/auth/auth-context";
import type { OtpInput as OtpInputValue } from "@/lib/auth/types";
import { hasErrors, validateOtp, type AuthErrors } from "@/lib/auth/validation";

const initialForm: OtpInputValue = {
  code: "",
};

export default function VerifyOtpScreen() {
  const { verifyOtp } = useAuth();
  const { flow } = useLocalSearchParams<{
    flow?: "signup" | "forgot-password";
  }>();
  const [form, setForm] = useState<OtpInputValue>(initialForm);
  const [errors, setErrors] = useState<AuthErrors<OtpInputValue>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const showBackLink = flow === "forgot-password";

  async function handleSubmit() {
    const nextErrors = validateOtp(form);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    await verifyOtp(form);
    setIsSubmitting(false);
    router.replace(AUTH_ROUTES.home);
  }

  return (
    <AppView className="flex-1 justify-center bg-pario-ink px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <AuthCard className="gap-7 border-0 bg-transparent p-0 dark:bg-transparent">
          <View className="items-center gap-3 px-3">
            <AppText
              className="text-center text-[28px] text-foreground-dark"
              variant="title"
            >
              {AUTH_COPY.otp.title}
            </AppText>
            <AppText
              className="text-center text-sm text-muted-foreground-dark"
              variant="muted"
            >
              {AUTH_COPY.otp.description}
            </AppText>
          </View>

          <OtpInput
            error={errors.code}
            helperText={AUTH_COPY.otp.helper}
            label={AUTH_FIELDS.otp.label}
            length={AUTH_FIELDS.otp.length}
            onChangeText={(code) => setForm({ code })}
            value={form.code}
          />

          <Button
            className="h-14 rounded-full bg-accent active:bg-accent-hover"
            isLoading={isSubmitting}
            onPress={handleSubmit}
            textClassName="text-accent-foreground"
            title={AUTH_COPY.otp.submit}
          />

          <View className="items-center gap-4">
            <Button
              className="h-auto px-0 py-0"
              textClassName="text-accent"
              title={AUTH_COPY.otp.resend}
              variant="ghost"
            />

            {showBackLink ? (
              <Link href={AUTH_ROUTES.forgotPassword}>
                <AppText className="text-muted-foreground-dark" variant="muted">
                  {AUTH_COPY.otp.backAction}
                </AppText>
              </Link>
            ) : null}
          </View>
        </AuthCard>
      </KeyboardAvoidingView>
    </AppView>
  );
}
