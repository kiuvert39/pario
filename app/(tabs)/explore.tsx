import { View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function TabTwoScreen() {
  return (
    <ThemedView className="flex-1 px-6 py-14">
      <View className="gap-6">
        <View className="gap-3">
          <ThemedText type="title">Structure</ThemedText>
          <ThemedText className="text-muted-foreground dark:text-muted-foreground-dark">
            A small map of where product code should live from here.
          </ThemedText>
        </View>

        <View className="gap-3">
          <Collapsible title="Routes">
            <ThemedText className="text-muted-foreground dark:text-muted-foreground-dark">
              Put screens and layouts in `app`. Keep route files thin by moving reusable UI into
              `components`.
            </ThemedText>
          </Collapsible>

          <Collapsible title="Styling">
            <ThemedText className="text-muted-foreground dark:text-muted-foreground-dark">
              Use NativeWind classes for spacing, layout, typography, and colors. Reach for inline
              styles only when an API needs runtime values.
            </ThemedText>
          </Collapsible>

          <Collapsible title="Theme">
            <ThemedText className="text-muted-foreground dark:text-muted-foreground-dark">
              Edit `constants/theme.json` when colors change. Tailwind and runtime helpers both
              read from that file.
            </ThemedText>
          </Collapsible>
        </View>
      </View>
    </ThemedView>
  );
}
