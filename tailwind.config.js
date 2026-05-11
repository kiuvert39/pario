const theme = require('./constants/theme.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: theme.colors.light.background,
        foreground: theme.colors.light.foreground,
        card: theme.colors.light.card,
        muted: theme.colors.light.muted,
        'muted-foreground': theme.colors.light.mutedForeground,
        border: theme.colors.light.border,
        primary: theme.colors.light.primary,
        'primary-foreground': theme.colors.light.primaryForeground,
        accent: theme.colors.light.accent,
        icon: theme.colors.light.icon,
        'background-dark': theme.colors.dark.background,
        'foreground-dark': theme.colors.dark.foreground,
        'card-dark': theme.colors.dark.card,
        'muted-dark': theme.colors.dark.muted,
        'muted-foreground-dark': theme.colors.dark.mutedForeground,
        'border-dark': theme.colors.dark.border,
        'primary-dark': theme.colors.dark.primary,
        'primary-foreground-dark': theme.colors.dark.primaryForeground,
        'accent-dark': theme.colors.dark.accent,
        'icon-dark': theme.colors.dark.icon,
      },
      borderRadius: {
        card: '8px',
      },
    },
  },
  plugins: [],
};
