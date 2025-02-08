export const Colors = {
  light: {
    primary: '#FF69B4', // pink
    secondary: '#FFA500', // orange
    background: '#FFFFFF',
    text: '#000000',
    cardBackground: '#F8F8F8',
    gradient: ['#FF69B4', '#FFA500'] as const,
    statusBar: 'dark',
    tint: '#FF69B4',
    tabIconDefault: '#C7C7CC',
    tabIconSelected: '#FF69B4',
  },
  dark: {
    primary: '#FF1493', // deeper pink
    secondary: '#FF8C00', // darker orange
    background: '#000000',
    text: '#FFFFFF',
    cardBackground: '#1C1C1E',
    gradient: ['#FF1493', '#FF8C00'] as const,
    statusBar: 'light',
    tint: '#FF1493',
    tabIconDefault: '#C7C7CC',
    tabIconSelected: '#FF1493',
  },
};

export type ThemeType = typeof Colors.light; 