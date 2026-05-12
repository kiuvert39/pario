import { View as NativeView, type ViewProps } from 'react-native';

export type AppViewProps = ViewProps & {
  className?: string;
};

export function AppView({ className, ...props }: AppViewProps) {
  return (
    <NativeView
      className={['bg-background dark:bg-background-dark', className].filter(Boolean).join(' ')}
      {...props}
    />
  );
}
