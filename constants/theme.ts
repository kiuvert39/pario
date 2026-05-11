import theme from './theme.json';

export type ColorSchemeName = 'light' | 'dark';

export const Colors = {
  light: {
    ...theme.colors.light,
    text: theme.colors.light.foreground,
    tint: theme.colors.light.primary,
    tabIconDefault: theme.colors.light.icon,
    tabIconSelected: theme.colors.light.primary,
  },
  dark: {
    ...theme.colors.dark,
    text: theme.colors.dark.foreground,
    tint: theme.colors.dark.primary,
    tabIconDefault: theme.colors.dark.icon,
    tabIconSelected: theme.colors.dark.primary,
  },
} as const;

export const Theme = theme;
