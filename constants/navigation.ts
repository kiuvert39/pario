import navigationContent from './navigation-content.json';

export type BottomNavKey = (typeof navigationContent.bottomNav)[number]['key'];

export const MAIN_ROUTES = {
  exchange: '/exchange',
  home: '/home',
  markets: '/markets',
  portfolio: '/portfolio',
  profile: '/profile',
} as const;

export const NAVIGATION_COPY = navigationContent;
