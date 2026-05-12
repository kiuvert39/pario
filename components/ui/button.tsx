import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, View, type PressableProps } from 'react-native';

import { AppText } from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const buttonClasses = {
  primary: 'bg-primary active:bg-primary-hover dark:bg-primary-dark dark:active:bg-primary-hover-dark',
  secondary:
    'border border-border bg-card active:bg-muted dark:border-border-dark dark:bg-card-dark dark:active:bg-muted-dark',
  ghost: 'bg-transparent active:bg-muted dark:active:bg-muted-dark',
} as const;

const textClasses = {
  primary: 'text-primary-foreground dark:text-primary-foreground-dark',
  secondary: 'text-foreground dark:text-foreground-dark',
  ghost: 'text-primary dark:text-primary-dark',
} as const;

type ButtonVariant = keyof typeof buttonClasses;

export type ButtonProps = PressableProps & {
  className?: string;
  isLoading?: boolean;
  leftAccessory?: ReactNode;
  textClassName?: string;
  title: string;
  variant?: ButtonVariant;
};

export function Button({
  className,
  disabled,
  isLoading = false,
  leftAccessory,
  textClassName,
  title,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <Pressable
      accessibilityRole="button"
      className={[
        'h-12 items-center justify-center rounded-card px-4',
        buttonClasses[variant],
        isDisabled ? 'opacity-60' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      disabled={isDisabled}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.primaryForeground : colors.primary} />
      ) : (
        <View className="flex-row items-center justify-center gap-3">
          {leftAccessory}
          <AppText className={['font-semibold', textClasses[variant], textClassName].filter(Boolean).join(' ')}>
            {title}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}
