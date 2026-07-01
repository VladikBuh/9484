import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveItem<T>(key: string, value: T): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadItem<T>(key: string, fallback: T): Promise<T> {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) {return fallback;}
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

export const KEYS = {
  ONBOARDING_DONE:       'onboarding_done',
  DO_NOT_DISTURB:        'do_not_disturb',
  HOUSEKEEPING:          'housekeeping',
  REQUEST_QUANTITIES:    'request_quantities',
  CART_ITEMS:            'cart_items',
  CART_NOTE:             'cart_note',
  MENU_CATEGORY:         'menu_category',
  WISHLIST_IDS:          'wishlist_ids',
  CLIMATE:               'climate_settings',
} as const;
