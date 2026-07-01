// ─── Menu ───────────────────────────────────────────────────────────
export type MenuCategory = 'Breakfast' | 'Main Courses' | 'Desserts' | 'Drinks';

export interface MenuItem {
  id: number;
  name: string;
  ingredients: string;
  prepTime: string;
  price: number;
  image: string;
  category: MenuCategory;
}

export interface CartItem {
  menuItemId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface MenuOrder {
  items: CartItem[];
  note: string;
  submittedAt: string;
}

// ─── Requests ───────────────────────────────────────────────────────
export interface GuestRequest {
  id: number;
  title: string;
  description: string;
  image: string;
  emoji: string;
}

// ─── Explore ────────────────────────────────────────────────────────
export interface Location {
  id: number;
  name: string;
  coordinates: string;
  shortDescription: string;
  paragraph1: string;
  paragraph2: string;
  image: string;
}

// ─── Climate ────────────────────────────────────────────────────────
export type ClimateMode = 'Cool' | 'Heat' | 'Fan' | 'Auto';

export interface ClimateSettings {
  temperature: number;
  mode: ClimateMode;
  onTimerEnabled: boolean;
  onTime: string;
  offTimerEnabled: boolean;
  offTime: string;
}

// ─── Onboarding ─────────────────────────────────────────────────────
export interface OnboardingPage {
  title: string;
  subtitle: string;
  emoji: string;
  bgImage: string;
}
