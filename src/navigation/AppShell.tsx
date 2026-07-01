import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useAppNavigation} from './NavigationContext';
import {LoaderScreen}    from '../screens/LoaderScreen';
import {OnboardingScreen}from '../screens/OnboardingScreen';
import {HomeScreen}      from '../screens/HomeScreen';
import {RequestsScreen}  from '../screens/RequestsScreen';
import {MenuScreen}      from '../screens/MenuScreen';
import {ExploreScreen}   from '../screens/ExploreScreen';
import {ClimateScreen}   from '../screens/ClimateScreen';
import {LocationDetailScreen} from '../screens/LocationDetailScreen';
import {CartScreen}      from '../screens/CartScreen';
import {TabBar}          from '../components/nav/TabBar';
import {colors}          from '../constants/theme';

export function AppShell() {
  const {phase, activeTab, overlay} = useAppNavigation();

  if (phase === 'Loader')     {return <LoaderScreen />;}
  if (phase === 'Onboarding') {return <OnboardingScreen />;}

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {activeTab === 'HomeTab'     && <HomeScreen />}
        {activeTab === 'RequestsTab' && <RequestsScreen />}
        {activeTab === 'MenuTab'     && <MenuScreen />}
        {activeTab === 'ExploreTab'  && <ExploreScreen />}
        {activeTab === 'ClimateTab'  && <ClimateScreen />}
      </View>

      <TabBar />

      {overlay.type === 'LocationDetail' && (
        <LocationDetailScreen locationId={overlay.locationId} />
      )}
      {overlay.type === 'Cart' && <CartScreen />}
    </View>
  );
}

const styles = StyleSheet.create({
  root:    {flex: 1, backgroundColor: colors.background},
  content: {flex: 1},
});
