import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

const focusItems = [
  {
    label: 'NativeWind',
    description: 'Class-based layout and spacing for screens and shared UI.',
  },
  {
    label: 'Theme tokens',
    description: 'One color source powers Tailwind, navigation, and small runtime reads.',
  },
  {
    label: 'App structure',
    description: 'Routes, components, hooks, and constants have clear ownership.',
  },
];

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  return (
    <ThemedView className="flex-1 px-6 py-14">
      <View className="gap-8">
        <View className="gap-3">
          <ThemedText className="text-sm font-semibold uppercase text-primary dark:text-primary-dark">
            Pario
          </ThemedText>
          <ThemedText type="title">Clean foundation</ThemedText>
          <ThemedText className="text-muted-foreground dark:text-muted-foreground-dark">
            The Expo starter copy is gone. This app now has a focused styling setup and a color
            system that can grow with the product.
          </ThemedText>
        </View>

        <View className="gap-3">
          {focusItems.map((item) => (
            <View
              key={item.label}
              className="gap-2 rounded-card border border-border bg-card p-4 dark:border-border-dark dark:bg-card-dark">
              <View className="flex-row items-center gap-2">
                <View className="h-8 w-8 items-center justify-center rounded-card bg-muted dark:bg-muted-dark">
                  <IconSymbol name="checkmark.circle.fill" size={18} color={colors.primary} />
                </View>
                <ThemedText type="defaultSemiBold">{item.label}</ThemedText>
              </View>
              <ThemedText className="text-muted-foreground dark:text-muted-foreground-dark">
                {item.description}
              </ThemedText>
            </View>
          ))}
        </View>

        <Link href="/modal" asChild>
          <Pressable className="self-start rounded-card bg-primary px-4 py-3 dark:bg-primary-dark">
            <ThemedText className="font-semibold text-primary-foreground dark:text-primary-foreground-dark">
              View structure
            </ThemedText>
          </Pressable>
        </Link>
      </View>
    </ThemedView>
  );
}
