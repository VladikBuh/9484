import React from 'react';
import {NavigationProvider} from './NavigationContext';
import {RequestsProvider} from '../context/RequestsContext';
import {MenuProvider} from '../context/MenuContext';
import {ExploreProvider} from '../context/ExploreContext';
import {ClimateProvider} from '../context/ClimateContext';
import {AppShell} from './AppShell';

export function AppNavigator() {
  return (
    <RequestsProvider>
      <MenuProvider>
        <ExploreProvider>
          <ClimateProvider>
            <NavigationProvider>
              <AppShell />
            </NavigationProvider>
          </ClimateProvider>
        </ExploreProvider>
      </MenuProvider>
    </RequestsProvider>
  );
}
