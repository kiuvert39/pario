import { Text, type TextProps } from 'react-native';

const textClasses = {
  default: 'text-base leading-6 text-foreground dark:text-foreground-dark',
  title: 'text-3xl font-bold leading-9 text-foreground dark:text-foreground-dark',
  defaultSemiBold: 'text-base font-semibold leading-6 text-foreground dark:text-foreground-dark',
  subtitle: 'text-xl font-bold text-foreground dark:text-foreground-dark',
  link: 'text-base font-semibold leading-7 text-primary dark:text-primary-dark',
} as const;

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  className,
  style,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      className={[textClasses[type], className].filter(Boolean).join(' ')}
      style={style}
      {...rest}
    />
  );
}
