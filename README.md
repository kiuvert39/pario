## Pario

Expo Router app with NativeWind styling and a shared theme source.

### Structure

- `app/`: route files and navigation layouts.
- `app/(auth)/`: login, signup, forgot password, and OTP verification routes.
- `components/ui/`: reusable UI primitives.
- `constants/theme.json`: source of truth for font and color tokens.
- `constants/auth.ts`: source of truth for auth routes, labels, copy, and field rules.
- `lib/auth/`: auth state, service boundary, types, and validation for the full auth flow.
- `constants/theme.ts`: typed runtime wrapper for navigation and component logic.
- `tailwind.config.js`: NativeWind/Tailwind config that reads from `constants/theme.json`.

### Styling

Use `className` with NativeWind for layout, spacing, typography, and colors. Add or edit color
and font tokens in `constants/theme.json`; do not duplicate raw theme values in screens.
