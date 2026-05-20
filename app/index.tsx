import { router } from 'expo-router';
import { useEffect } from 'react';
import { Image, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { AppText } from '@/components/ui/text';
import { AppView } from '@/components/ui/view';
import { AUTH_COPY, AUTH_ROUTES } from '@/constants/auth';

export default function IndexScreen() {
  const [primaryCard, secondaryCard] = AUTH_COPY.onboarding.cards;
  const swing = useSharedValue(0);

  useEffect(() => {
    swing.value = withRepeat(
      withSequence(
        withTiming(-2.5, { duration: 1400 }),
        withTiming(2.5, { duration: 1400 })
      ),
      -1,
      true
    );
  }, [swing]);

  const secondaryCardStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${-6 + swing.value}deg` }],
  }));

  return (
    <AppView className="flex-1 justify-between bg-pario-ink px-6 pb-10 pt-16">
      <View className="h-[360px]">
        <View className="absolute left-0 right-0 top-6 gap-4 rounded-[18px] bg-pario-ink-raised/95 p-4">
          <View className="flex-row justify-between">
            <AppText className="text-xs text-foreground-dark">{primaryCard.eyebrowLeft}</AppText>
            <AppText className="text-xs text-foreground-dark">{primaryCard.eyebrowCenter}</AppText>
            <AppText className="text-xs text-foreground-dark">{primaryCard.eyebrowRight}</AppText>
          </View>
          <View className="gap-2">
            <AppText className="text-xl text-foreground-dark">{primaryCard.title}</AppText>
            <AppText className="text-sm text-muted-foreground-dark">
              {primaryCard.description}
            </AppText>
          </View>
          <View className="flex-row items-center">
            <Image
              className="h-8 w-8 rounded-full border border-pario-ink-raised"
              resizeMode="cover"
              source={{ uri: primaryCard.image }}
            />
            <Image
              className="-ml-1 h-8 w-8 rounded-full border border-pario-ink-raised"
              resizeMode="cover"
              source={{ uri: secondaryCard.image }}
            />
            <View className="-ml-1 h-8 w-8 items-center justify-center rounded-full bg-accent">
              <AppText className="text-lg leading-5 text-accent-foreground">+</AppText>
            </View>
          </View>
        </View>

        <Animated.View
          className="absolute left-10 right-0 top-44 gap-4 rounded-[18px] bg-pario-ink-raised p-4"
          style={secondaryCardStyle}>
          <View className="flex-row justify-between">
            <AppText className="text-xs text-foreground-dark">{secondaryCard.eyebrowLeft}</AppText>
            <AppText className="text-xs text-foreground-dark">{secondaryCard.eyebrowCenter}</AppText>
            <AppText className="text-xs text-foreground-dark">{secondaryCard.eyebrowRight}</AppText>
          </View>
          <View className="gap-2">
            <AppText className="text-xl text-foreground-dark">{secondaryCard.title}</AppText>
            <AppText className="text-sm text-muted-foreground-dark">
              {secondaryCard.description}
            </AppText>
          </View>
          <View className="flex-row items-center">
            <Image
              className="h-8 w-8 rounded-full border border-pario-ink-raised"
              resizeMode="cover"
              source={{ uri: secondaryCard.image }}
            />
            <Image
              className="-ml-1 h-8 w-8 rounded-full border border-pario-ink-raised"
              resizeMode="cover"
              source={{ uri: primaryCard.image }}
            />
            <View className="-ml-1 h-8 w-8 items-center justify-center rounded-full bg-accent">
              <AppText className="text-lg leading-5 text-accent-foreground">+</AppText>
            </View>
          </View>
        </Animated.View>
      </View>

      <View className="gap-8">
        <View className="gap-3">
          <AppText className="max-w-[330px] text-[32px] font-bold leading-[39px] text-foreground-dark">
            {AUTH_COPY.onboarding.title}
          </AppText>
          <AppText className="max-w-[280px] text-[15px] leading-6 text-muted-foreground-dark">
            {AUTH_COPY.onboarding.description}
          </AppText>
        </View>

        <Button
          className="h-14 rounded-full bg-accent active:bg-accent-hover"
          onPress={() => router.push(AUTH_ROUTES.signup)}
          textClassName="text-accent-foreground"
          title={`${AUTH_COPY.onboarding.cta}  ->`}
        />
      </View>
    </AppView>
  );
}
