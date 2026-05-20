const theme = require('./constants/theme.json');
const brand = theme.colors.brand;

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'pario-green': brand.parioGreen,
        'pario-green-hover': brand.parioGreenHover,
        'pario-amber': brand.parioAmber,
        'pario-amber-hover': brand.parioAmberHover,
        'pario-ink': brand.parioInk,
        'pario-ink-raised': brand.parioInkRaised,
        'pario-ink-border': brand.parioInkBorder,
        background: theme.colors.light.background,
        foreground: theme.colors.light.foreground,
        card: theme.colors.light.card,
        muted: theme.colors.light.muted,
        'muted-foreground': theme.colors.light.mutedForeground,
        border: theme.colors.light.border,
        primary: theme.colors.light.primary,
        'primary-hover': theme.colors.light.primaryHover,
        'primary-foreground': theme.colors.light.primaryForeground,
        accent: theme.colors.light.accent,
        'accent-hover': theme.colors.light.accentHover,
        'accent-foreground': theme.colors.light.accentForeground,
        'nav-active': theme.colors.light.navActive,
        icon: theme.colors.light.icon,
        'background-dark': theme.colors.dark.background,
        'foreground-dark': theme.colors.dark.foreground,
        'card-dark': theme.colors.dark.card,
        'muted-dark': theme.colors.dark.muted,
        'muted-foreground-dark': theme.colors.dark.mutedForeground,
        'border-dark': theme.colors.dark.border,
        'primary-dark': theme.colors.dark.primary,
        'primary-hover-dark': theme.colors.dark.primaryHover,
        'primary-foreground-dark': theme.colors.dark.primaryForeground,
        'accent-dark': theme.colors.dark.accent,
        'accent-hover-dark': theme.colors.dark.accentHover,
        'accent-foreground-dark': theme.colors.dark.accentForeground,
        'nav-active-dark': theme.colors.dark.navActive,
        'icon-dark': theme.colors.dark.icon,
      },
      fontFamily: {
        sans: theme.fonts.sans,
      },
      borderRadius: {
        card: '8px',
      },
    },
  },
  plugins: [],
};
