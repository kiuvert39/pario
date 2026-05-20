import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SvgXml } from "react-native-svg";

import { AppText } from "@/components/ui/text";
import { NAVIGATION_COPY } from "@/constants/navigation";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

const iconXml = {
  home: '<svg viewBox="0 0 24 24" fill="none"><path d="M4.5 10.2 12 4l7.5 6.2v8.3a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5v-8.3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M9 20v-5h6v5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  portfolio:
    '<svg viewBox="0 0 24 24" fill="none"><path d="M8.2 8.5a5 5 0 1 0 7.3 6.7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M13 3.8a6.7 6.7 0 0 1 6.7 6.7H13V3.8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
  exchange:
    '<svg viewBox="0 0 24 24" fill="none"><path d="M7 7h11l-3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 17H6l3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M18 7l-3 3M6 17l3-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  markets:
    '<svg viewBox="0 0 24 24" fill="none"><path d="M5 20V9m4 11V5m4 15v-8m4 8V7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><path d="M4 20h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  profile:
    '<svg viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="1.8"/><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
} as const;

type BottomNavIcon = keyof typeof iconXml;
type BottomNavItem = (typeof NAVIGATION_COPY.bottomNav)[number] & {
  icon: BottomNavIcon;
};

type BottomNavBarProps = {
  state: {
    index: number;
    routes: Array<{
      key: string;
      name: string;
    }>;
  };
  navigation: {
    emit: (event: {
      canPreventDefault?: boolean;
      target?: string;
      type: "tabPress" | "tabLongPress";
    }) => {
      defaultPrevented?: boolean;
    };
    navigate: (name: string) => void;
  };
};

export function BottomNav({ state, navigation }: BottomNavBarProps) {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme() ?? "light";
  const colors = Colors[colorScheme];
  const activeColor = colors.primary;
  const inactiveColor = colors.mutedForeground;
  const bottomPadding = Math.max(insets.bottom, 12);

  return (
    <View
      className="border-t border-border/50 bg-background px-2 pt-2 dark:border-border-dark/50 dark:bg-background-dark"
      style={{ paddingBottom: bottomPadding }}
    >
      <View className="flex-row items-center justify-between">
        {(NAVIGATION_COPY.bottomNav as BottomNavItem[]).map((item) => {
          const routeIndex = state.routes.findIndex(
            (route) => route.name === item.key,
          );
          const isActive = routeIndex === state.index;
          const color = isActive ? activeColor : inactiveColor;

          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={isActive ? { selected: true } : {}}
              className="min-h-[60px] flex-1 items-center justify-center rounded-xl"
              key={item.key}
              onLongPress={() => {
                const route = state.routes[routeIndex];
                if (route) {
                  navigation.emit({
                    canPreventDefault: true,
                    target: route.key,
                    type: "tabLongPress",
                  });
                }
              }}
              onPress={() => {
                const route = state.routes[routeIndex];
                if (!route) return;

                const event = navigation.emit({
                  canPreventDefault: true,
                  target: route.key,
                  type: "tabPress",
                });

                if (!isActive && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              }}
            >
              <View className="items-center gap-1">
                <SvgXml
                  color={color}
                  height={24}
                  width={24}
                  xml={iconXml[item.icon]}
                />
                <AppText
                  className={[
                    "text-[11px] tracking-[0.2px]",
                    isActive
                      ? "font-semibold text-primary dark:text-primary-dark"
                      : "text-muted-foreground dark:text-muted-foreground-dark",
                  ].join(" ")}
                  numberOfLines={1}
                >
                  {item.label}
                </AppText>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
