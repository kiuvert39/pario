const theme = require('./constants/theme.json');

module.exports = {
  expo: {
    name: 'pario',
    slug: 'pario',
    version: '1.0.0',
    orientation: 'portrait',
    scheme: 'pario',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
    },
    web: {
      bundler: 'metro',
      output: 'static',
    },
    plugins: ['expo-router'],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
  },
};
