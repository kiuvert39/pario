import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function ModalScreen() {
  return (
    <ThemedView className="flex-1 justify-center px-6">
      <View className="gap-5 rounded-card border border-border bg-card p-6 dark:border-border-dark dark:bg-card-dark">
        <View className="gap-2">
          <ThemedText type="title">Project details</ThemedText>
          <ThemedText className="text-muted-foreground dark:text-muted-foreground-dark">
            Pario is ready for real screens: NativeWind drives styling, and theme tokens live in
            one place.
          </ThemedText>
        </View>

        <View className="gap-3">
          <ThemedText type="defaultSemiBold">Structure</ThemedText>
          <ThemedText className="text-muted-foreground dark:text-muted-foreground-dark">
            App routes stay in `app`, reusable UI stays in `components`, and shared theme values
            stay in `constants`.
          </ThemedText>
        </View>

        <Link href="/" dismissTo asChild>
          <Pressable className="self-start rounded-card bg-primary px-4 py-3 dark:bg-primary-dark">
            <ThemedText className="font-semibold text-primary-foreground dark:text-primary-foreground-dark">
              Back to home
            </ThemedText>
          </Pressable>
        </Link>
      </View>
    </ThemedView>
  );
}
