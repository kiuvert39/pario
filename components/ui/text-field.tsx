import { TextInput, type TextInputProps, View } from 'react-native';

import { AppText } from '@/components/ui/text';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export type TextFieldProps = TextInputProps & {
  className?: string;
  error?: string;
  label: string;
  labelClassName?: string;
};

export function TextField({ className, error, label, labelClassName, ...props }: TextFieldProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <View className="gap-2">
      <AppText className={labelClassName} variant="label">
        {label}
      </AppText>
      <TextInput
        className={[
          'h-12 rounded-card border bg-card px-4 font-sans text-base text-foreground dark:bg-card-dark dark:text-foreground-dark',
          error
            ? 'border-red-500'
            : 'border-border focus:border-primary dark:border-border-dark dark:focus:border-primary-dark',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        placeholderTextColor={colors.mutedForeground}
        {...props}
      />
      {error ? <AppText className="text-red-500">{error}</AppText> : null}
    </View>
  );
}
