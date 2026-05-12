import { Text as NativeText, type TextProps } from 'react-native';

const textClasses = {
  body: 'font-sans text-base leading-6 text-foreground dark:text-foreground-dark',
  title: 'font-sans text-3xl font-bold leading-9 text-foreground dark:text-foreground-dark',
  subtitle: 'font-sans text-xl font-bold text-foreground dark:text-foreground-dark',
  label: 'font-sans text-sm font-semibold text-foreground dark:text-foreground-dark',
  muted: 'font-sans text-sm leading-5 text-muted-foreground dark:text-muted-foreground-dark',
  link: 'font-sans text-base font-semibold text-primary dark:text-primary-dark',
} as const;

type TextVariant = keyof typeof textClasses;

export type AppTextProps = TextProps & {
  className?: string;
  variant?: TextVariant;
};

export function AppText({ className, variant = 'body', ...props }: AppTextProps) {
  return (
    <NativeText
      className={[textClasses[variant], className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
