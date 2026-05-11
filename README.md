## Pario

Expo Router app with NativeWind styling and a shared theme source.

### Structure

- `app/`: route files and navigation layouts.
- `components/`: reusable UI primitives and platform-specific components.
- `constants/theme.json`: source of truth for light and dark color tokens.
- `constants/theme.ts`: typed runtime wrapper for navigation and component logic.
- `tailwind.config.js`: NativeWind/Tailwind config that reads from `constants/theme.json`.

### Styling

Use `className` with NativeWind for layout, spacing, typography, and colors. Add or edit color
tokens in `constants/theme.json`; do not duplicate color hex values in screens.
