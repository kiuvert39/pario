import { View, type ViewProps } from 'react-native';

export type AuthCardProps = ViewProps & {
  className?: string;
};

export function AuthCard({ className, ...props }: AuthCardProps) {
  return (
    <View
      className={[
        'gap-6 rounded-card border border-border bg-card p-5 dark:border-border-dark dark:bg-card-dark',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  );
}
