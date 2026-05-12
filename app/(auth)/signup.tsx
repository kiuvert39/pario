import { Link, router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";

import { AuthCard } from "@/components/ui/auth-card";
import { Button } from "@/components/ui/button";
import { AppText } from "@/components/ui/text";
import { TextField } from "@/components/ui/text-field";
import { AppView } from "@/components/ui/view";
import { AUTH_COPY, AUTH_FIELDS, AUTH_ROUTES } from "@/constants/auth";
import { AUTH_ASSETS } from "@/constants/auth-assets";
import { useAuth } from "@/lib/auth/auth-context";
import type { SignupInput } from "@/lib/auth/types";
import {
  hasErrors,
  validateSignup,
  type AuthErrors,
} from "@/lib/auth/validation";

const initialForm: SignupInput = {
  email: "",
  name: "",
  password: "",
};

export default function SignupScreen() {
  const { signup } = useAuth();
  const [form, setForm] = useState<SignupInput>(initialForm);
  const [errors, setErrors] = useState<AuthErrors<SignupInput>>({});
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    const nextErrors = validateSignup(form);
    setErrors(nextErrors);

    if (hasErrors(nextErrors)) {
      return;
    }

    setIsSubmitting(true);
    await signup(form);
    setIsSubmitting(false);
    router.push({
      pathname: AUTH_ROUTES.otp,
      params: { flow: "signup" },
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
              {AUTH_COPY.signup.title}
            </AppText>
            <AppText
              className="text-center text-sm text-muted-foreground-dark"
              variant="muted"
            >
              {AUTH_COPY.signup.description}
            </AppText>
          </View>

          <Button
            className="h-12 rounded-full border-0 bg-pario-ink-raised"
            leftAccessory={
              <SvgXml height={20} width={20} xml={AUTH_ASSETS.googleLogoSvg} />
            }
            textClassName="text-foreground-dark"
            title={AUTH_COPY.signup.oauth}
            variant="secondary"
          />

          <View className="flex-row items-center gap-3">
            <View className="h-px flex-1 bg-border-dark" />
            <AppText
              className="text-xs text-muted-foreground-dark"
              variant="muted"
            >
              {AUTH_COPY.signup.divider}
            </AppText>
            <View className="h-px flex-1 bg-border-dark" />
          </View>

          <View className="gap-4">
            <TextField
              autoComplete="name"
              className="rounded-full border-0 bg-pario-ink-raised text-foreground-dark"
              error={errors.name}
              label={AUTH_FIELDS.name.label}
              labelClassName="text-foreground-dark"
              onChangeText={(name) =>
                setForm((current) => ({ ...current, name }))
              }
              placeholder={AUTH_FIELDS.name.placeholder}
              textContentType="name"
              value={form.name}
            />
            <TextField
              autoCapitalize="none"
              autoComplete="email"
              className="rounded-full border-0 bg-pario-ink-raised text-foreground-dark"
              error={errors.email}
              keyboardType="email-address"
              label={AUTH_FIELDS.email.label}
              labelClassName="text-foreground-dark"
              onChangeText={(email) =>
                setForm((current) => ({ ...current, email }))
              }
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
              onChangeText={(password) =>
                setForm((current) => ({ ...current, password }))
              }
              placeholder={AUTH_FIELDS.password.placeholder}
              secureTextEntry
              textContentType="newPassword"
              value={form.password}
            />
          </View>

          <Pressable
            className="flex-row items-center gap-3"
            onPress={() => setHasAcceptedTerms((current) => !current)}
          >
            <View
              className={[
                "h-5 w-5 items-center justify-center rounded-md border",
                hasAcceptedTerms
                  ? "border-accent bg-accent"
                  : "border-border-dark",
              ].join(" ")}
            >
              {hasAcceptedTerms ? (
                <AppText className="text-xs text-accent-foreground leading-none">
                  ✓
                </AppText>
              ) : null}
            </View>
            <View className="flex-row gap-2">
              <AppText className="text-xs text-foreground-dark" variant="muted">
                {AUTH_COPY.signup.terms}
              </AppText>

              <Pressable
                onPress={() => Linking.openURL(AUTH_COPY.signup.termsLink)}
              >
                <AppText className="text-xs text-accent pt-1" variant="link">
                  {AUTH_COPY.signup.privacy}
                </AppText>
              </Pressable>
            </View>
          </Pressable>

          <Button
            className="h-14 rounded-full bg-accent active:bg-accent-hover"
            disabled={!hasAcceptedTerms}
            isLoading={isSubmitting}
            onPress={handleSubmit}
            textClassName="text-accent-foreground"
            title={AUTH_COPY.signup.submit}
          />

          <View className="flex-row justify-center gap-1">
            <AppText className="text-foreground-dark" variant="muted">
              {AUTH_COPY.signup.switchPrompt}
            </AppText>
            <Link href={AUTH_ROUTES.login}>
              <AppText className="text-accent" variant="link">
                {AUTH_COPY.signup.switchAction}
              </AppText>
            </Link>
          </View>
        </AuthCard>
      </KeyboardAvoidingView>
    </AppView>
  );
}
