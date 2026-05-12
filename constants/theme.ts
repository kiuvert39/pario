import theme from './theme.json';
import type { Theme as NavigationTheme } from '@react-navigation/native';

export type ColorSchemeName = 'light' | 'dark';

export const Colors = {
  light: {
    ...theme.colors.light,
    brand: theme.colors.brand,
    text: theme.colors.light.foreground,
    tint: theme.colors.light.primary,
    tabIconDefault: theme.colors.light.icon,
    tabIconSelected: theme.colors.light.primary,
  },
  dark: {
    ...theme.colors.dark,
    brand: theme.colors.brand,
    text: theme.colors.dark.foreground,
    tint: theme.colors.dark.primary,
    tabIconDefault: theme.colors.dark.icon,
    tabIconSelected: theme.colors.dark.primary,
  },
} as const;

export const Fonts = theme.fonts;

export const Theme = theme;

export function createNavigationTheme(
  colorScheme: ColorSchemeName,
  baseTheme: NavigationTheme
): NavigationTheme {
  const colors = Colors[colorScheme];

  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: colors.background,
      border: colors.border,
      card: colors.card,
      notification: colors.accent,
      primary: colors.primary,
      text: colors.foreground,
    },
  };
}
