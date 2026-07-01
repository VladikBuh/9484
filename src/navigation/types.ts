export type AppPhase = 'Loader' | 'Onboarding' | 'Main';

export type GuestTab =
  | 'HomeTab'
  | 'RequestsTab'
  | 'MenuTab'
  | 'ExploreTab'
  | 'ClimateTab';

export type GuestOverlay =
  | {type: 'none'}
  | {type: 'LocationDetail'; locationId: number}
  | {type: 'Cart'}
  | {type: 'OrderSent'}
  | {type: 'RequestSent'; title: string}
  | {type: 'RoomAccessSent'}
  | {type: 'ClimateUpdated'};
