import { View, type ViewProps } from 'react-native';

import { AppView } from '@/components/ui/view';

type MainShellProps = ViewProps & {
  className?: string;
};

export function MainShell({ children, className, ...props }: MainShellProps) {
  return (
    <AppView className="flex-1">
      <View className={['flex-1', className].filter(Boolean).join(' ')} {...props}>
        {children}
      </View>
    </AppView>
  );
}
