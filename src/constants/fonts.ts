import {Platform} from 'react-native';

export const fonts = {
  serifBold: Platform.select({
    ios:     'Georgia-Bold',
    android: 'serif',
    default: 'Georgia-Bold',
  })!,
  serifRegular: Platform.select({
    ios:     'Georgia',
    android: 'serif',
    default: 'Georgia',
  })!,
  sansRegular: Platform.select({
    ios:     'System',
    android: 'sans-serif',
    default: 'System',
  })!,
  sansMedium: Platform.select({
    ios:     'System',
    android: 'sans-serif-medium',
    default: 'System',
  })!,
  sansSemiBold: Platform.select({
    ios:     'System',
    android: 'sans-serif',
    default: 'System',
  })!,
  sansBold: Platform.select({
    ios:     'System',
    android: 'sans-serif',
    default: 'System',
  })!,
} as const;
